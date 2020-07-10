import { Form } from 'antd';
import { useState } from 'react';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _get from 'lodash/get';
import CreateRecipeForm from './CreateRecipeForm';
import { useFetchUser } from 'lib/user';
import Loading from './notify/Loading';
import Router from 'next/router';
import { useCreateRecipeGraphQlMutation, RecipesGraphQlDocument } from 'generated/apollo-components';

export default function CreateRecipe() {
    const [form] = Form.useForm();
    const [status, setStatus] = useState('DRAFT');
    const [ingredients, setIngredients] = useState([]);
    const { user, loading: isFetchingUser } = useFetchUser();
    const owner = _get(user, 'sub') || '';

    const [createRecipeMutation, { loading }] = useCreateRecipeGraphQlMutation();
    const onFinish = (values) => {
        createRecipeMutation({ variables: { data: { ...values, owner } }, refetchQueries: [{ query: RecipesGraphQlDocument }] });
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
        console.log(form.getFieldsValue());
        console.log(images);
    };
    if (isFetchingUser) {
        return <Loading />;
    }
    if (!user) {
        Router.replace('/');
    }
    return (
        <CreateRecipeForm
            form={form}
            initialValues={{ title: '', description: '', content: '', ingredients, status_: status, images: {} }}
            onFinish={onFinish}
            ingredients={ingredients}
            status={status}
            handleAddIngredient={handleAddIngredient}
            handleDeleteIngredient={handleDeleteIngredient}
            handleDropDownUnitChange={handleDropDownUnitChange}
            handleInputChange={handleInputChange}
            handleDropDownStatusChange={handleDropDownStatusChange}
            handleSubmitImages={handleSubmitImages}
            loading={loading}
        />
    );
}
