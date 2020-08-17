import Link from 'next/link';
import { useRouter } from 'next/router';

import { Row, Col, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import _get from 'lodash/get';
import styled from 'styled-components';

import MainLayout from 'components/layout/MainLayout';
import Loading from 'components/notify/Loading';
import { RecipeList, queryEnum } from 'components/RecipeList';
import { useUser } from 'lib/user';

const MyRecipes = () => {
    const { user, loading } = useUser();
    const router = useRouter();
    const owner = _get(user, 'sub');
    const options = owner ? { variables: { where: { owner } } } : {};
    if (loading) return <Loading />;
    if (!user) {
        router.replace('/');
    }
    return (
        <MainLayout title="My Recipes">
            <StyledRow>
                <Col span={24}>
                    <Title>My Recipes</Title>
                    <Link href="/create" passHref>
                        <Button type="primary">Create</Button>
                    </Link>
                </Col>
            </StyledRow>
            <RecipeList parentRoute="my-recipes" queryType={queryEnum.recipes} options={options} />
        </MainLayout>
    );
};

export default MyRecipes;

export const StyledRow = styled(Row)`
    ${({ theme }) => `
        padding:8px;
        clear:both;
        h1{
            padding-left:${theme['padding_sm']};
            margin:0;
            text-align: left;
            font-size:2em;
            display:inline-block;
        }
        .ant-btn-primary{
            float:right;
            margin-right:${theme['margin_sm']};
        }
    `}
`;
