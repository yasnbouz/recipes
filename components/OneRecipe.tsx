import { Col, Row, Typography, List } from 'antd';
import GraphImg from 'graphcms-image';
import styled from 'styled-components';
import { generateUnit } from 'utils/generateUnit';
import { generateDate } from 'utils/generateDate';
import ReactMarkdown from 'react-markdown';
import { CalendarOutlined } from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;

export default function OneRecipe({ recipe }) {
    const { title, description, content, ingredients, images, status_, userLikes, owner, createdAt } = recipe;
    const recipeCreatedAt = generateDate(createdAt);
    return (
        <Row>
            <StyledOneRecipe sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 12, offset: 6 }}>
                <Row>
                    <Col span={24}>
                        <GraphImg image={images[0]} alt={title} />
                    </Col>
                </Row>
                <Row>
                    <Col span={20} offset={2}>
                        <h1>{recipe.title}</h1>
                        <Paragraph className="createdAt">
                            <CalendarOutlined /> {`${recipeCreatedAt} ${owner ? `by ${owner}` : ''}`}
                        </Paragraph>
                        <Paragraph>{description}</Paragraph>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={4}>
                        <List
                            header={<Title level={3}>Ingredients:</Title>}
                            bordered
                            dataSource={ingredients || [{ type: 'None added', amount: 0, unit: '' }]}
                            renderItem={({ unit, amount, type }) => (
                                <List.Item>
                                    <Text>{ingredients ? `${amount} ${generateUnit(unit, amount)} ${type}` : `${type}`}</Text>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={20} offset={2}>
                        <Title level={2}>Directions:</Title>
                        <ReactMarkdown source={content} />
                    </Col>
                </Row>
            </StyledOneRecipe>
        </Row>
    );
}

const StyledOneRecipe = styled(Col)`
    ${({ theme }) => `
        overflow:hidden;
        margin-top:${theme['margin_sm']};
        box-shadow: 0 0 4px ${theme['border_color']};
        border-radius: 8px;
        h1{
            font-size:${theme['font_size_xl']};
            margin-top:${theme['margin_sm']};
            @media (max-width:480px){
                font-size:${theme['font_size_lg']};
            }
        }
        h2{
            font-size: ${theme['font_size_md']};
        }
        h3{
            font-size: ${theme['font_size_lg']};
        }
        `};
    .ant-col > h2 {
        text-align: left;
    }
    > .ant-row:not(:last-child) {
        margin-bottom: 1rem;
    }
    .ant-typography.createdAt {
        color: #f58230;
    }
    .graphcms-image-wrapper {
        max-height: 600px;
    }
`;
