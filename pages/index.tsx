import MainLayout from 'components/layout/MainLayout';
import { RecipeList, queryEnum } from 'components/RecipeList';

const Home = () => {
    return (
        <MainLayout title="Recipes">
            <RecipeList parentRoute="recipe" queryType={queryEnum.recipes} />
        </MainLayout>
    );
};

export default Home;
