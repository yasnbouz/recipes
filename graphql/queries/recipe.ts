import gql from 'graphql-tag';

export const recipeGraphQL = gql`
    query recipeGraphQL($where: RecipeWhereUniqueInput!) {
        recipe(where: $where) {
            id
            status_
            title
            content
            description
            ingredients
            createdAt
            userLikes {
                id
                user
            }
            owner
            images {
                id
                fileName
                height
                width
                size
                handle
            }
        }
    }
`;
