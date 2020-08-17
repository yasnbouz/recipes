import { useState } from 'react';

import { Form, Button, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';

import { GenerateInput, GenerateTextInput, GenerateDropDown } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';
import PictureUploader from './PictureUploader';

const statusList = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

type RecipeFormProps = {
    form?: FormInstance;
    ingredients: { amount: string; unit: string; type: string }[];
    status: string;
    handleAddIngredient: (event: any) => void;
    handleDeleteIngredient: (key: number) => void;
    handleInputChange?: (event: any) => void;
    handleDropDownUnitChange?: (item: string, index: number) => void;
    handleDropDownStatusChange: (event: any) => void;
    onFinish: (values: any) => void;
    handleSubmitImages: (images: any) => void;
    loading: boolean;
    initialValues: object;
};

export default function CreateRecipeForm({
    form,
    onFinish,
    ingredients,
    status,
    handleAddIngredient,
    handleDeleteIngredient,
    handleDropDownUnitChange,
    handleInputChange,
    handleDropDownStatusChange,
    handleSubmitImages,
    loading,
    initialValues,
}: RecipeFormProps) {
    const [recipeState, setRecipeState] = useState({ isPicUploading: false });

    return (
        <Form layout="horizontal" name="create-recipe-form" form={form} onFinish={onFinish} initialValues={initialValues}>
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
                </Col>
                <GenerateDropDown
                    name="status_"
                    label="status"
                    status={status}
                    handleDropDownChange={handleDropDownStatusChange}
                    statusList={statusList}
                />
                <Col span={12} offset={6}>
                    <Form.Item label="Create Recipe">
                        <Button disabled={loading || recipeState.isPicUploading} type="primary" htmlType="submit">
                            Create Recipe
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
