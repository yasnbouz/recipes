import { print } from 'graphql';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';

import { RecipeGraphQlDocument, RecipesGraphQlDocument, UserLikeGraphQlDocument } from 'generated/apollo-components';
import auth0 from 'lib/auth0';
import { graphqlClient } from 'pages/api/graphql';

import { getUserObject } from './getUserObject';

export const verifyNotABannedMutation = async (req, res) => {
    const isBannedMutaion = req.body.query.match(/deleteMany|updateMany|upsert/g);
    if (!_isNil(isBannedMutaion)) {
        throw new Error('Invalid Mutation Requested');
    }
};

export const verifyUserMatches = async (req, res) => {
    const requestedUserID: string = getUserObject(req.body.variables);
    if (!_isNil(requestedUserID)) {
        const { user } = await auth0.getSession(req);
        const actualUserID: string = _get(user, 'sub');
        if (actualUserID !== requestedUserID) {
            throw new Error('Invalid User Requested');
        }
    }
};
export const verifyUserPermission = async (req, res) => {
    const { variables } = req.body;
    const mutationsTomatch = [
        { match: /updateRecipe/g, queryToCheck: print(RecipeGraphQlDocument), vars: variables, path: 'recipe.owner' },
        {
            match: /deleteAsset/g,
            queryToCheck: print(RecipesGraphQlDocument),
            vars: { where: { images_every: { id: _get(variables, 'where.id') } } },
            path: 'recipes[0].owner',
        },
        {
            match: /deleteRecipe/g,
            queryToCheck: print(RecipeGraphQlDocument),
            vars: variables,
            path: 'recipe.owner',
        },
        { match: /deleteUserLike/g, queryToCheck: print(UserLikeGraphQlDocument), vars: variables, path: 'userLike.user' },
    ];

    const doAnyVerificationFail = await Promise.all(
        mutationsTomatch.map(async ({ match, queryToCheck, vars, path }) => {
            const hasMatch = req.body.query.match(match);

            if (!_isNil(hasMatch)) {
                const { user } = await auth0.getSession(req);
                const actualUserID = _get(user, 'sub');
                const result = await graphqlClient.request(queryToCheck, vars);
                const owner = _get(result, path);
                if (owner !== actualUserID) {
                    return true;
                }
            }
            return false;
        }),
    );
    if (doAnyVerificationFail.some((m) => !!m)) {
        throw new Error('You are not authorized to make that change.');
    }
};
