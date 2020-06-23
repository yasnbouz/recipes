import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import { recipesGraphQL } from 'graphql/queries/recipes';
import { userLikesGraphQL } from 'graphql/queries/userLikes';
import { get, map } from 'lodash';
import { Row, Col } from 'antd';
import { Recipe } from 'generated/apollo-components';
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
    if (loading) return <p>loading...</p>;
    if (error || !recipesList) return <p>Error:{error}</p>;
    if (recipesList.length === 0) return <p>No Recipes</p>;
    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                {recipesList.map((recipe: Recipe) => (
                    <pre key={recipe.id}>{JSON.stringify(recipe, null, 4)}</pre>
                ))}
            </Col>
        </Row>
    );
};
