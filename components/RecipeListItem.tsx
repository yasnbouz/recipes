import Link from 'next/link';
import GraphImg from 'graphcms-image';
import EllipsisText from 'react-ellipsis-text';
import { Recipe } from 'generated/apollo-components';
import { Col } from 'antd';
import styled from 'styled-components';
const StyledRecipe = styled(Col)`
    ${({ theme }) => `
        padding:0 ${theme['padding_sm']} !important;
        .card{
            overflow:hidden;
            border:1px solid ${theme.border_color};
            margin-bottom:${theme['margin_sm']};
            height:340px;
            border-radius:5px;
            transition:box-shadow .3s ease;
            &:hover{
                box-shadow:0 0 16px ${theme['border_color']};
            }
            .graphcms-image-outer-wrapper{
                cursor:pointer;
                .graphcms-image-wrapper{
                    width:100%;
                    height:200px;
                }
            }
            .recipe-content{
                padding:${theme['padding_sm']};
                h3{
                    margin:0 0 1em;
                }
            }
        }
    `}
`;

export default function RecipeListItem({ recipe, parentRoute }: { recipe: Recipe; parentRoute: string }) {
    const { title, description, images, id, userLikes } = recipe;
    return (
        <StyledRecipe xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <div className="card">
                <Link href={`/${parentRoute}/${recipe.id}`} passHref>
                    <div>{images ? <GraphImg image={images[0]} alt={title} /> : null}</div>
                </Link>
                <div className="recipe-content">
                    <h3>{title}</h3>
                    <p>
                        <EllipsisText text={description} length={110} />
                    </p>
                </div>
            </div>
        </StyledRecipe>
    );
}
