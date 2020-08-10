import {
    UserLike,
    RecipeGraphQlDocument,
    UserLikesGraphQlDocument,
    useCreateUserLikeGraphQlMutation,
    useDeleteUserLikeGraphQlMutation,
} from 'generated/apollo-components';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import styled from 'styled-components';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useUser } from 'lib/user';

function LikeButton({ recipeId, userLikes }: { recipeId: string; userLikes: UserLike[] }) {
    const { user } = useUser();
    const owner = get(user, 'sub');
    const userLike = _filter(userLikes, { user: owner });
    const hasUserLike = userLike.length > 0 ? true : false;

    // userlike mutation
    const [addUserLike] = useCreateUserLikeGraphQlMutation();
    const [deleteUserLike] = useDeleteUserLikeGraphQlMutation();

    const handleRecipeLike = () => {
        const refetchQueries = [
            { query: RecipeGraphQlDocument, variables: { where: { id: recipeId } } },
            { query: UserLikesGraphQlDocument, variables: { where: { user: owner } } },
        ];
        if (hasUserLike) {
            deleteUserLike({
                refetchQueries,
                variables: { where: { id: userLike[0].id } },
            });
        } else {
            addUserLike({
                refetchQueries,
                variables: { data: { user: owner, recipe: { connect: { id: recipeId } } } },
            });
        }
    };

    if (isEmpty(owner))
        return (
            <StyledSpan>
                {`${userLikes.length} `} <HeartOutlined />
            </StyledSpan>
        );
    return (
        <StyledSpan>
            {`${userLikes.length} `}
            {hasUserLike ? <HeartFilled onClick={handleRecipeLike} /> : <HeartOutlined onClick={handleRecipeLike} />}
        </StyledSpan>
    );
}

const StyledSpan = styled.span`
    ${({ theme }) => `
        color: ${theme['heart_color']};
        font-size: ${theme['font_size_sm']};
        padding-left:3px;
        flex: 0 0 auto;
    `}
`;

export default LikeButton;
