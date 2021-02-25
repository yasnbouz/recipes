import { Layout, Typography, Row, Col } from 'antd';

const { Footer } = Layout;
const { Link, Paragraph } = Typography;
const MainFooter = () => (
    <Footer>
        <Row justify="center">
            <Col>
                <Paragraph strong>
                    Made with ❤ by{' '}
                    <Link href="https://github.com/yasnbouz" target="_blank" style={{ color: '#055dbd' }}>
                        @yasnbouz
                    </Link>
                </Paragraph>
            </Col>
        </Row>
    </Footer>
);

export default MainFooter;
