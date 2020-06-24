import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import { recipesGraphQL } from 'graphql/queries/recipes';
import { userLikesGraphQL } from 'graphql/queries/userLikes';
import { get, map } from 'lodash';
import { Row } from 'antd';
import { Recipe } from 'generated/apollo-components';
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
    const query = queryType === queryEnum.recipes ? recipesGraphQL : userLikesGraphQL;
    const { data, loading, error } = useQuery(query, options);
    const parentArray = get(data, queryType);
    const recipesList = map(parentArray, (value) => get(value, 'recipe', value));
    if (loading) return <Loading />;
    if (error || !recipesList) return <Error errorText={`${error}`} />;
    if (recipesList.length === 0) return <Warning warnHeader="No Recipes" warnText="No recipes are present, why not add one?" />;
    return (
        <Row gutter={16} style={{ margin: 'auto' }}>
            {recipesList.map((recipe: Recipe) => (
                <RecipeListItem key={`${recipe.id}-${queryType}`} recipe={recipe} parentRoute={parentRoute} />
            ))}
        </Row>
    );
};
