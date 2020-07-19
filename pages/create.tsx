import MainLayout from 'components/layout/MainLayout';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import CreateRecipe from 'components/CreateRecipe';
import { useUser } from 'lib/user';
import Router from 'next/router';
import Loading from 'components/notify/Loading';
const Create = () => {
    const { user, loading: isFetchingUser } = useUser();
    if (isFetchingUser) return <Loading />;
    if (!user) {
        Router.replace('/');
    }
    return (
        <MainLayout title="Create Recipe">
            <StyledRow>
                <Col span={24}>
                    <Title>Create Recipe</Title>
                </Col>
            </StyledRow>
            <CreateRecipe />
        </MainLayout>
    );
};

export const StyledRow = styled(Row)`
    padding: 8px;
    h1 {
        margin: 0;
        text-align: center;
        font-size: 2em;
    }
`;

export default Create;
