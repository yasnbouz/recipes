import { useState } from 'react';

import { useRouter } from 'next/router';

import { Form, Row, Col, Button, Space } from 'antd';
import GraphImg from 'graphcms-image';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';

import {
    useRecipeGraphQlQuery,
    useUpdateRecipeGraphQlMutation,
    RecipeGraphQlDocument,
    useDeleteAssetGraphQlMutation,
} from 'generated/apollo-components';
import { useUser } from 'lib/user';
import { createUpdateObj } from 'utils/createUpdateObj';
import { useSubmitForm } from 'utils/submitForm';

import DeleteButton from './DeleteButton';
import { GenerateInput, GenerateTextInput, GenerateDropDown } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';
import Loading from './notify/Loading';
import PictureUploader from './PictureUploader';

const statusList = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export default function UpdateRecipe({ id }: { id: string }) {
    const { user, loading: isFetchUser } = useUser();
    const router = useRouter();
    const { data, loading: isQueryLoading, error } = useRecipeGraphQlQuery({ variables: { where: { id } } });
    const [UpdateRecipeMutation, { loading: updateRecipeLoading }] = useUpdateRecipeGraphQlMutation();
    const [deleteAssetMutation, { loading: deleteAssetLoading }] = useDeleteAssetGraphQlMutation();
    const [form] = Form.useForm();
    const [recipeState, setRecipeState] = useState({ isQueryLoading, isPicUploading: false });

    const onFinish = async (values) => {
        // update image
        const { handle: queryImageHandle, id: idImg } = _get(data, 'recipe.images[0]', {});
        const formImageHandle = _get(values, 'images.create[0].handle');

        if (queryImageHandle !== formImageHandle && !_isNil(formImageHandle) && !_isNil(queryImageHandle)) {
            await deleteAssetMutation({ variables: { where: { id: idImg } } });
        }
        const updateObj = createUpdateObj(data, values);
        if (!_isEmpty(updateObj)) {
            await UpdateRecipeMutation({
                refetchQueries: [{ query: RecipeGraphQlDocument, variables: { where: { id } } }],
                variables: {
                    data: {
                        ...updateObj,
                    },
                    where: { id },
                },
            });
        }
    };
    const {
        initialValues,
        ingredients,
        setIngredients,
        status,
        handleAddIngredient,
        handleDeleteIngredient,
        handleDropDownStatusChange,
        handleDropDownUnitChange,
        handleInputChange,
        handleSubmitImages,
        onUpdateFinish,
    } = useSubmitForm(
        form,
        {
            title: '',
            description: '',
            content: '',
            ingredients: [],
            status_: 'DRAFT',
            images: [],
        },
        onFinish,
    );
    if (!isQueryLoading && recipeState.isQueryLoading) {
        const { __typename, ...loadedRecipe } = _get(data, 'recipe', {});
        setIngredients(loadedRecipe.ingredients);
        form.setFieldsValue({
            ...loadedRecipe,
        });
        setRecipeState((state) => ({ ...state, isQueryLoading }));
    }
    if (!data || isFetchUser) return <Loading />;
    const owner = _get(user, 'sub') || '';
    const recipeOwner = _get(data, 'recipe.owner');
    if (!user || owner !== recipeOwner) {
        router.replace('/');
    }

    const disabled = updateRecipeLoading || updateRecipeLoading || deleteAssetLoading || recipeState.isPicUploading;
    return (
        <Form layout="horizontal" name="update-recipe-form" form={form} onFinish={onUpdateFinish} initialValues={initialValues}>
            <GenerateInput name="title" />
            <GenerateInput name="description" />
            <GenerateTextInput name="content" />
            <GenerateIngredients
                names={['amount', 'unit', 'type']}
                values={ingredients}
                handleAddIngredient={handleAddIngredient}
                handleDeleteIngredient={handleDeleteIngredient}
                handleDropDownChange={handleDropDownUnitChange}
                handleInputChange={handleInputChange}
            />
            <Row>
                <Col span={12} offset={6}>
                    <Form.Item label="Upload Image" name="images">
                        <PictureUploader handleSubmitImages={handleSubmitImages} setRecipeState={setRecipeState} />
                    </Form.Item>
                    {data.recipe.images ? <GraphImg image={data.recipe.images[0] || {}} alt={data.recipe.title} /> : null}
                </Col>
                <GenerateDropDown
                    name="status_"
                    label="status"
                    status={status}
                    handleDropDownChange={handleDropDownStatusChange}
                    statusList={statusList}
                />
                <Col span={12} offset={6}>
                    <Form.Item label="Action">
                        <Space size={4}>
                            <Button disabled={disabled} type="primary" htmlType="submit">
                                Update Recipe
                            </Button>
                            <DeleteButton recipeID={id} imageID={_get(data, 'recipe.images[0].id')} disabled={disabled} />
                        </Space>
                    </Form.Item>
                </Col>
            </Row>

            <style global jsx>
                {`
                    .ant-form .ant-form-item .ant-form-item-label,
                    .ant-form .ant-form-item .ant-form-item-control {
                        flex: 0 0 100%;
                        max-width: 100%;
                        text-align: left;
                    }
                    .graphcms-image-wrapper {
                        max-width: 300px;
                    }
                `}
            </style>
        </Form>
    );
}
