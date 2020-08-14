import { GetServerSideProps } from 'next';

import MainLayout from 'components/layout/MainLayout';
import { RecipeList, queryEnum } from 'components/RecipeList';
import { RecipesGraphQlDocument } from 'generated/apollo-components';
import { initializeApollo } from 'lib/apolloClient';

const Home = () => {
    return (
        <MainLayout title="Recipes">
            <RecipeList parentRoute="recipe" queryType={queryEnum.recipes} />
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const apolloClient = initializeApollo();
    await apolloClient.query({ query: RecipesGraphQlDocument });
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    };
};

export default Home;
