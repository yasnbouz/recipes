import styled from 'styled-components';

import { QueryHookOptions } from '@apollo/react-hooks';
import { Row } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

import { Recipe, useRecipesGraphQlQuery, useUserLikesGraphQlQuery } from 'generated/apollo-components';

import Error from './notify/Error';
import Loading from './notify/Loading';
import Warning from './notify/Warning';
import RecipeListItem from './RecipeListItem';

export enum queryEnum {
    userLikes = 'userLikes',
    recipes = 'recipes',
}

type RecipeListProps = {
    options?: QueryHookOptions;
    parentRoute: string;
    queryType: queryEnum;
};

export const RecipeList = ({ options, parentRoute, queryType }: RecipeListProps) => {
    const { data, loading, error } = queryType === queryEnum.recipes ? useRecipesGraphQlQuery(options) : useUserLikesGraphQlQuery(options);
    const parentArray = _get(data, queryType);
    const recipesList = _map(parentArray, (value) => _get(value, 'recipe', value)).filter((o) => !_isEmpty(o));
    if (loading) return <Loading />;
    if (error || !recipesList) return <Error errorText={`${error}`} />;
    if (recipesList.length === 0) return <Warning warnHeader="No Recipes" warnText="No recipes are present, why not add one?" />;
    return (
        <StyledRow gutter={16}>
            {recipesList.map((recipe: Recipe) => (
                <RecipeListItem key={`${recipe.id}-${queryType}`} recipe={recipe} parentRoute={parentRoute} />
            ))}
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
    ${({ theme }) => `
        padding:${theme['padding_sm']};
        margin:0 !important;
    `};
`;
