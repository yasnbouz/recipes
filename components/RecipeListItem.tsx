import Link from 'next/link';

import { Col } from 'antd';
import { motion } from 'framer-motion';
import GraphImg from 'graphcms-image';
import EllipsisText from 'react-ellipsis-text';
import styled from 'styled-components';

import { Recipe } from 'generated/apollo-components';

import LikeButton from './LikeButton';

const StyledRecipe = styled(Col)`
    ${({ theme }) => `
        padding:0 ${theme['padding_sm']} !important;
        .card{
            overflow:hidden;
            border:1px solid ${theme.border_color};
            margin-bottom:${theme['margin_sm']};
            border-radius:5px;
            transition:box-shadow .3s ease;
            &:hover{
                box-shadow:0px 10px 20px rgba(0,0,0,0.1);
            }
            .graphcms-image-outer-wrapper{
                cursor:pointer;
                .graphcms-image-wrapper{
                    max-width:100%;
                    height:200px;
                }
            }
            .recipe-content{
                padding:${theme['padding_sm']};
                & > div{
                    display:flex;
                    justify-content:space-between;
                }
                h2{
                    margin:0 0 1em;
                    cursor:pointer;
                }
            }
        }
    `}
`;
type RecipeListItemProps = {
    recipe: Recipe;
    parentRoute: string;
};
const stagger = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
    },
};
export default function RecipeListItem({ recipe, parentRoute }: RecipeListItemProps) {
    const { title, description, images, id, userLikes } = recipe;

    return (
        <StyledRecipe xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <motion.div className="card" variants={stagger} whileHover={{ scale: 1.1 }}>
                <Link href={`/${parentRoute}/[id]`} as={`/${parentRoute}/${recipe.id}`}>
                    <div>{images ? <GraphImg image={images[0] || {}} alt={title} /> : null}</div>
                </Link>
                <div className="recipe-content">
                    <div>
                        <h2>
                            <Link href={`/${parentRoute}/[id]`} as={`/${parentRoute}/${recipe.id}`}>
                                <EllipsisText text={title} length={35} />
                            </Link>
                        </h2>
                        <LikeButton recipeId={id} userLikes={userLikes} />
                    </div>
                    <p>
                        <EllipsisText text={description} length={110} />
                    </p>
                </div>
            </motion.div>
        </StyledRecipe>
    );
}
