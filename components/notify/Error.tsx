import { Row, Col, Alert } from 'antd';
import styled from 'styled-components';

const StyledCol = styled(Col)`
    text-align: center;
    margin-top: 100px;
`;

export default function Error({ errorText }: { errorText?: string }) {
    return (
        <Row>
            <StyledCol span={12} offset={6}>
                <Alert message="💥 An error has occured" description={errorText || 'Error'} type="error" closable />
            </StyledCol>
        </Row>
    );
}
