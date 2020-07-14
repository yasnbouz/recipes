import { useState } from 'react';
import {
    useRecipeGraphQlQuery,
    useUpdateRecipeGraphQlMutation,
    RecipeGraphQlDocument,
    useDeleteAssetGraphQlMutation,
} from 'generated/apollo-components';
import { useSubmitForm } from 'utils/submitForm';
import { Form, Row, Col, Button } from 'antd';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import { GenerateInput, GenerateTextInput, GenerateDropDown } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';
import PictureUploader from './PictureUploader';
import Loading from './notify/Loading';
import { createUpdateObj } from 'utils/createUpdateObj';
import GraphImg from 'graphcms-image';

const statusList = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export default function UpdateRecipe({ id }: { id: string }) {
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
    if (!data) return <Loading />;
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
                    <Form.Item label="Update Recipe">
                        <Button disabled={disabled} type="primary" htmlType="submit">
                            Update Recipe
                        </Button>
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
