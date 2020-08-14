import _filter from 'lodash/filter';
import _sortBy from 'lodash/sortBy';
import { useState } from 'react';

export const useSubmitForm = (form, initialValues, callback) => {
    const [ingredients, setIngredients] = useState(initialValues.ingredients);
    const [status, setStatus] = useState(initialValues.status_);

    const onUpdateFinish = (values) => {
        callback(values);
        // setIngredients([]);
        // form.resetFields();
    };
    const onCreateFinish = (values) => {
        callback(values);
        setIngredients([]);
        form.resetFields();
    };
    const handleDropDownStatusChange = (item) => {
        form.setFieldsValue({ status_: item });
        setStatus(item);
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
    const handleSubmitImages = (images) => {
        form.setFieldsValue({ images });
    };
    return {
        ingredients,
        setIngredients,
        status,
        initialValues,
        onCreateFinish,
        onUpdateFinish,
        handleDropDownStatusChange,
        handleAddIngredient,
        handleDeleteIngredient,
        handleDropDownUnitChange,
        handleInputChange,
        handleSubmitImages,
    };
};
