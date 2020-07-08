import { Form, Button, Row, Col } from 'antd';
import { GenerateInput, GenerateTextInput, GenerateDropDown } from './GenerateFields';
import { GenerateIngredients } from './GenerateIngredients';
import { FormInstance } from 'antd/lib/form';
const statusList = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

type RecipeFormProps = {
    form?: FormInstance;
    ingredients: { key: number; amount: string; unit: string; type: string }[];
    status: string;
    handleAddIngredient: (event: any) => void;
    handleDeleteIngredient: (key: number) => void;
    handleInputChange?: (event: any) => void;
    handleDropDownUnitChange?: (item: string, index: number) => void;
    handleDropDownStatusChange: (event: any) => void;
    onFinish: (values: any) => void;
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
}: RecipeFormProps) {
    return (
        <Form
            layout="horizontal"
            name="create-recipe-form"
            form={form}
            onFinish={onFinish}
            initialValues={{ title: '', description: '', content: '', ingredients, status }}
        >
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
                <GenerateDropDown name="status" status={status} handleDropDownChange={handleDropDownStatusChange} statusList={statusList} />
                <Col span={16} />
                <Col span={4}>
                    <Form.Item label="Create Recipe">
                        <Button type="primary" htmlType="submit">
                            Create Recipe
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
