import styled from 'styled-components';

import { Spin } from 'antd';

const StyledSpinner = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;
const Loading = () => {
    return (
        <StyledSpinner>
            <Spin size="large" />
        </StyledSpinner>
    );
};
export default Loading;
