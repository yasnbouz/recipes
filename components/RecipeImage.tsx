import { useState, useRef } from 'react';

import { motion, useDomEvent } from 'framer-motion';
import GraphImg from 'graphcms-image';
import styled from 'styled-components';

export default function RecipeImage({ image, title }) {
    const [isOpen, setOpen] = useState(false);
    useDomEvent(useRef(window as any), 'scroll', () => setOpen(false));

    return (
        <StyledRecipeImg>
            <div className={`image-container ${isOpen ? 'open' : ''}`}>
                <motion.div animate={{ opacity: isOpen ? 1 : 0 }} className="shade" onClick={() => setOpen(false)} />
                <motion.div layout className="recipe-image" onClick={() => setOpen(!isOpen)}>
                    <GraphImg image={image} alt={title} title={title} className="recipe-image" />
                </motion.div>
            </div>
        </StyledRecipeImg>
    );
}
const StyledRecipeImg = styled.div`
    .image-container {
        position: relative;
        width: 100%;
        cursor: zoom-in;
        z-index: 1;
        height: 420px;
        .graphcms-image-outer-wrapper {
            position: unset !important;
        }
        .recipe-image {
            position: absolute !important;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
        }
        .shade {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            opacity: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 0;
        }
        &.open {
            cursor: zoom-out;
            .shade {
                pointer-events: auto;
                cursor: zoom-out;
                opacity: 1;
            }
            .recipe-image {
                position: fixed !important;
                height: auto;
                width: auto;
                max-width: 100%;
                margin: 30px 0;
            }
        }
    }
`;
