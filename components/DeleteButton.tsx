import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeleteRecipeGraphQlMutation, useDeleteAssetGraphQlMutation, RecipeGraphQlDocument } from 'generated/apollo-components';
import Router from 'next/router';
const { confirm } = Modal;
type DeleteButtonProps = {
    recipeID: string;
    imageID: string;
    disabled: boolean;
};
export default function DeleteButton({ recipeID, imageID, disabled }: DeleteButtonProps) {
    const [deleteRecipeMutation, { loading: deleteRecipeLoading }] = useDeleteRecipeGraphQlMutation();
    const [deleteAssetMutation, { loading: deleteAssetLoading }] = useDeleteAssetGraphQlMutation();
    const showDeleteConfirm = () => {
        confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure delete this recipe?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                if (imageID && !deleteAssetLoading) await deleteAssetMutation({ variables: { where: { id: imageID } } });
                if (!deleteRecipeLoading)
                    await deleteRecipeMutation({
                        variables: { where: { id: recipeID } },
                    });
                Router.replace('/my-recipes');
            },
        });
    };
    return (
        <Button onClick={showDeleteConfirm} type="primary" danger disabled={disabled || deleteRecipeLoading || deleteAssetLoading}>
            Delete Recipe
        </Button>
    );
}
