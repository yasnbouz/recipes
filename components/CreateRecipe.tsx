import { Form } from 'antd';
import { useState } from 'react';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import CreateRecipeForm from './CreateRecipeForm';

export default function CreateRecipe() {
    const [form] = Form.useForm();
    const [status, setStatus] = useState('--choose--');
    const [ingredients, setIngredients] = useState([]);

    const onFinish = (values) => {
        console.log(values);
        // form.resetFields();
    };
    const handleDropDownStatusChange = (item) => {
        form.setFieldsValue({ status: item });
        setStatus(item);
        console.log(form.getFieldsValue());
    };
    const handleAddIngredient = () => {
        const sortedIngredients = _sortBy(ingredients, ['key']);
        const key = sortedIngredients.length > 0 ? sortedIngredients[sortedIngredients.length - 1].key + 1 : 0;
        const newIngredient = { key, amount: '', unit: '-', type: '' };
        setIngredients((prevState) => [...prevState, newIngredient]);
        form.setFieldsValue({ ingredients: [...ingredients, newIngredient] });
    };
    const handleDeleteIngredient = (key) => {
        const filteredIngredients = _filter(ingredients, (_, index) => index !== key);
        setIngredients(filteredIngredients);
        form.setFieldsValue({ ingredients: filteredIngredients });
    };
    const handleDropDownUnitChange = (item, index) => {
        const newIngredients = ingredients.map((ingredient) => {
            if (ingredient.key === index) {
                return { ...ingredient, unit: item };
            } else return ingredient;
        });
        setIngredients(newIngredients);
        form.setFieldsValue({ ingredients: newIngredients });
    };
    const handleInputChange = (event) => {
        const { value, name, dataset } = event.target;
        const newIngredients = ingredients.map((ingredient) => {
            if (ingredient.key === +dataset.index) {
                return { ...ingredient, [name]: value };
            } else return ingredient;
        });
        setIngredients(newIngredients);
        form.setFieldsValue({ ingredients: newIngredients });
    };

    return (
        <CreateRecipeForm
            form={form}
            onFinish={onFinish}
            ingredients={ingredients}
            status={status}
            handleAddIngredient={handleAddIngredient}
            handleDeleteIngredient={handleDeleteIngredient}
            handleDropDownUnitChange={handleDropDownUnitChange}
            handleInputChange={handleInputChange}
            handleDropDownStatusChange={handleDropDownStatusChange}
        />
    );
}
