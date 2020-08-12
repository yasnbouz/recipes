import { GetServerSideProps } from 'next';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import { initializeApollo } from 'lib/apolloClient';
import { RecipeGraphQlDocument, useRecipeGraphQlQuery } from 'generated/apollo-components';
import Loading from 'components/notify/Loading';
import Error from 'components/notify/Error';
import MainLayout from 'components/layout/MainLayout';
import OneRecipe from 'components/OneRecipe';

export default function RecipePage() {
    const {
        query: { id },
    } = useRouter();
    const { data, loading, error } = useRecipeGraphQlQuery({ variables: { where: { id: `${id}` } } });
    const title = _get(data, 'recipe.title');
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

export const getServerSideProps: GetServerSideProps = async ({ params: { id } }) => {
    const apolloClient = initializeApollo();
    await apolloClient.query({ query: RecipeGraphQlDocument, variables: { where: { id } } });
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    };
};
