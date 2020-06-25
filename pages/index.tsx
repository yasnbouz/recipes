import MainLayout from 'components/layout/MainLayout';
import { RecipeList, queryEnum } from 'components/RecipeList';
import { initializeApollo } from 'lib/apolloClient';
import { GetStaticProps } from 'next';
import { RecipesGraphQlDocument } from 'generated/apollo-components';
const Home = () => {
    return (
        <MainLayout title="Recipes">
            <RecipeList parentRoute="recipe" queryType={queryEnum.recipes} />
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const apolloClient = initializeApollo();
    await apolloClient.query({ query: RecipesGraphQlDocument });
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
        unstable_revalidate: 1,
    };
};

export default Home;
