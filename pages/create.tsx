import MainLayout from 'components/layout/MainLayout';
import { StyledRow } from './my-recipes/index';
import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import CreateRecipe from 'components/CreateRecipe';
const Create = () => {
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

export default Create;
