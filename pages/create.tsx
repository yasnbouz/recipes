import MainLayout from 'components/layout/MainLayout';
import { StyledRow } from './my-recipes/index';
import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';
const Create = () => {
    return (
        <MainLayout title="Create Recipe">
            <StyledRow>
                <Col span={24}>
                    <Title>Create Recipe</Title>
                </Col>
            </StyledRow>
        </MainLayout>
    );
};

export default Create;
