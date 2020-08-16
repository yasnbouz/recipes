import { CalendarOutlined } from '@ant-design/icons';
import { Col, Row, Typography, List } from 'antd';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import { Recipe } from 'generated/apollo-components';
import { generateDate } from 'utils/generateDate';
import { generateUnit } from 'utils/generateUnit';

import LikeButton from './LikeButton';
import RecipeImage from './RecipeImage';

const { Title, Text, Paragraph } = Typography;

const fadeInUp = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};
const stagger = {
    initial: { opacity: 0, y: 80 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'backInOut' },
    },
};
const imgStagger = {
    initial: { opacity: 0, x: -200 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring' },
    },
};
export default function OneRecipe({ recipe }) {
    const { id, title, description, content, ingredients, images, userLikes, createdAt }: Recipe = recipe;
    const recipeCreatedAt = generateDate(Date.parse(createdAt));
    return (
        <Row>
            <StyledOneRecipe sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 12, offset: 6 }}>
                <Row>
                    <Col span={24}>
                        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
                            <motion.div variants={imgStagger}>
                                <RecipeImage image={images[0]} title={title} />
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>

                <Row>
                    <Col span={20} offset={2}>
                        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
                            <motion.div variants={stagger} className="recipeTitle">
                                <h1>{recipe.title}</h1>
                                <LikeButton recipeId={id} userLikes={userLikes} />
                            </motion.div>
                            <motion.div variants={stagger}>
                                <Paragraph className="createdAt">
                                    <CalendarOutlined /> {recipeCreatedAt}
                                </Paragraph>
                            </motion.div>
                            <motion.div variants={stagger}>
                                <Paragraph>{description}</Paragraph>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={4}>
                        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
                            <List
                                header={<Title level={2}>Ingredients:</Title>}
                                bordered
                                dataSource={ingredients || [{ type: 'None added', amount: 0, unit: '' }]}
                                renderItem={({ unit, amount, type }) => (
                                    <List.Item>
                                        <motion.div variants={stagger}>
                                            <Text>{ingredients ? `${amount} ${generateUnit(unit, amount)} ${type}` : `${type}`}</Text>
                                        </motion.div>
                                    </List.Item>
                                )}
                            />
                        </motion.div>
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
        margin-top:${theme['margin_sm']};
        box-shadow: 0 0 4px ${theme['border_color']};
        border-radius: 8px;
        .recipeTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            h1{
                font-size:${theme['font_size_xl']};
                margin-top:${theme['margin_sm']};
                @media (max-width:480px){
                    font-size:${theme['font_size_lg']};
                }
        }
            .gMgYCl {
                font-size: ${theme['font_size_md']};
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
        color: #000000b3;
    }
`;
