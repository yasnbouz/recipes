import { useRouter } from 'next/router';

import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import get from 'lodash/get';

import MainLayout from 'components/layout/MainLayout';
import Loading from 'components/notify/Loading';
import { RecipeList, queryEnum } from 'components/RecipeList';
import { useUser } from 'lib/user';
import { StyledRow } from 'pages/my-recipes/index';

const Favorites = () => {
    const { user, loading } = useUser();
    const router = useRouter();
    const owner = get(user, 'sub');
    const options = owner ? { variables: { where: { user: owner } } } : {};
    if (loading) return <Loading />;
    if (!user) {
        router.replace('/');
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
