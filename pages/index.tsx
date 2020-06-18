import styled from 'styled-components';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const Heading = styled.h1`
    color: crimson;
    font-size: 2em;
`;
const Home = () => {
    return (
        <div>
            <Heading>Hello</Heading>
            <Button type="primary" icon={<SearchOutlined />}>
                Search
            </Button>
        </div>
    );
};
export default Home;
