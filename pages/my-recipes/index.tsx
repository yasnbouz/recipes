import MainLayout from 'components/layout/MainLayout';
import { RecipeList, queryEnum } from 'components/RecipeList';
import { useFetchUser } from 'lib/user';
import { get } from 'lodash';
import { Row, Col, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';
import Router from 'next/router';
import Loading from 'components/notify/Loading';
import Link from 'next/link';

const MyRecipes = () => {
    const { user, loading } = useFetchUser();
    const owner = get(user, 'sub');
    const options = owner ? { variables: { where: { owner } } } : {};
    if (loading) return <Loading />;
    if (!user) {
        Router.replace('/');
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
