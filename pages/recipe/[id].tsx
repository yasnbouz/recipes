import { GetStaticProps, GetStaticPaths } from 'next';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { initializeApollo } from 'lib/apolloClient';
import { RecipeGraphQlDocument, RecipesIDsGraphQlDocument, useRecipeGraphQlQuery } from 'generated/apollo-components';
import Loading from 'components/notify/Loading';
import Error from 'components/notify/Error';
import MainLayout from 'components/layout/MainLayout';
import OneRecipe from 'components/OneRecipe';

export default function RecipePage() {
    const {
        query: { id },
    } = useRouter();
    const { data, loading, error } = useRecipeGraphQlQuery({ variables: { where: { id: `${id}` } } });
    const title = get(data, 'recipe.title');
    if (loading) return <Loading />;
    if (error)
        return (
            <MainLayout title="Recipe Loading Error">
                <Error errorText={`${error}`} />
            </MainLayout>
        );
    if (!title)
        return (
            <MainLayout title="Not a valid recipe">
                <Error errorText="Not a valid recipe" />
            </MainLayout>
        );
    return (
        <MainLayout title={title}>
            <OneRecipe recipe={data.recipe} />
        </MainLayout>
    );
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
    const apolloClient = initializeApollo();
    await apolloClient.query({ query: RecipeGraphQlDocument, variables: { where: { id } } });
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
        unstable_revalidate: 1,
    };
};
export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({ query: RecipesIDsGraphQlDocument });
    const paths = data.recipes.map((recipe) => ({ params: { id: recipe.id } }));
    return { paths, fallback: true };
};
