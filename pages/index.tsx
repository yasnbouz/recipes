import { useQuery } from '@apollo/react-hooks';
import { recipesGraphQL } from 'graphql/queries/recipes';
import MainLayout from 'components/layout/MainLayout';

const Home = () => {
    const { data, loading } = useQuery(recipesGraphQL);
    if (loading) return <p>loading...</p>;
    return (
        <MainLayout title="Recipes">
            <p>{data.recipes[0].title}</p>
        </MainLayout>
    );
};

export default Home;
