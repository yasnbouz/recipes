import MainLayout from 'components/layout/MainLayout';
import { RecipeList, queryEnum } from 'components/RecipeList';
import { useFetchUser } from 'lib/user';
import { get } from 'lodash';
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;
const Home = () => {
    const { user, loading } = useFetchUser();
    const owner = get(user, 'sub');
    const options = owner ? { variables: { where: { owner } } } : {};
    return (
        <MainLayout title="My Recipes">
            <StyledRow>
                <Col span={24}>
                    <Title>My Recipes</Title>
                </Col>
            </StyledRow>
            <RecipeList parentRoute="recipe" queryType={queryEnum.recipes} options={options} />
        </MainLayout>
    );
};

export default Home;

const StyledRow = styled(Row)`
    ${({ theme }) => `
        padding:8px;
        h1{
            padding-left:${theme['padding_sm']};
            margin:0;
            text-align: left;
            font-size:2em;
        }
    `}
`;
