import { Row, Col, Alert } from 'antd';
import styled from 'styled-components';
const StyledCol = styled(Col)`
    text-align: center;
    margin-top: 100px;
`;

export default function Warning({ warnHeader, warnText }: { warnHeader: string; warnText?: string }) {
    return (
        <Row>
            <StyledCol span={12} offset={6}>
                <Alert message={`⚠ ${warnHeader}`} description={warnText || 'An unknown warning has occured'} type="warning" closable />
            </StyledCol>
        </Row>
    );
}
