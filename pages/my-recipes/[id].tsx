import { useRouter } from 'next/router';

import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';

import MainLayout from 'components/layout/MainLayout';
import UpdateRecipe from 'components/UpdateRecipe';
import { StyledRow } from 'pages/create';

export default function MyRecipe() {
    const {
        query: { id },
    } = useRouter();
    return (
        <MainLayout title="Update Recipe">
            <StyledRow>
                <Col span={24}>
                    <Title>Update Recipe</Title>
                </Col>
            </StyledRow>
            <UpdateRecipe id={`${id}`} />
        </MainLayout>
    );
}
