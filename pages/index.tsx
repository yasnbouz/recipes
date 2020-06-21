import MainLayout from 'components/layout/MainLayout';
import { useRecipesGraphQlQuery } from 'generated/apollo-components';

const Home = () => {
    const { data, loading } = useRecipesGraphQlQuery();
    if (loading) return <p>loading...</p>;
    return (
        <MainLayout title="Recipes">
            hello
            <p>{data.recipes[0].title}</p>
        </MainLayout>
    );
};

export default Home;
