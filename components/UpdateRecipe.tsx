import { useState } from 'react';
import { useRecipeGraphQlQuery } from 'generated/apollo-components';
import { useSubmitForm } from 'utils/submitForm';
import { Form, Row, Col, Button } from 'antd';
import _get from 'lodash/get';
import { GenerateInput, GenerateTextInput, GenerateDropDown } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';
import PictureUploader from './PictureUploader';
import Loading from './notify/Loading';
const statusList = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export default function UpdateRecipe({ id }: { id: string }) {
    const { data, loading: isQueryLoading, error } = useRecipeGraphQlQuery({ variables: { where: { id } } });
    const [form] = Form.useForm();
    const [recipeState, setRecipeState] = useState({ isQueryLoading });
    const onFinish = (values) => {
        // console.log(values);
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
    return (
        <Form layout="horizontal" name="create-recipe-form" form={form} onFinish={onUpdateFinish} initialValues={initialValues}>
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
                        <PictureUploader handleSubmitImages={handleSubmitImages} />
                    </Form.Item>
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
                        <Button disabled={isQueryLoading} type="primary" htmlType="submit">
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
                `}
            </style>
        </Form>
    );
}
