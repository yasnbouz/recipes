import MainLayout from 'components/layout/MainLayout';
import { RecipeList, queryEnum } from 'components/RecipeList';
import { useFetchUser } from 'lib/user';
import get from 'lodash/get';
import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import { StyledRow } from 'pages/my-recipes/index';
import Loading from 'components/notify/Loading';
import Router from 'next/router';

const Favorites = () => {
    const { user, loading } = useFetchUser();
    const owner = get(user, 'sub');
    const options = owner ? { variables: { where: { user: owner } } } : {};
    if (loading) return <Loading />;
    if (!user) {
        Router.replace('/');
    }
    return (
        <MainLayout title="My Favorites">
            <StyledRow>
                <Col span={24}>
                    <Title>My Favorites</Title>
                </Col>
            </StyledRow>
            <RecipeList parentRoute="recipe" queryType={queryEnum.userLikes} options={options} />
        </MainLayout>
    );
};

export default Favorites;
