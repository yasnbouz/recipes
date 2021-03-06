import gql from 'graphql-tag';

export const recipesGraphQL = gql`
    query recipesGraphQL($where: RecipeWhereInput) {
        recipes(where: $where) {
            id
            status_
            title
            content
            description
            ingredients
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
export const recipesIDsGraphQL = gql`
    query recipesIDsGraphQL {
        recipes {
            id
        }
    }
`;
