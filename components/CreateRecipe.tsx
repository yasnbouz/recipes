import _get from 'lodash/get';
import CreateRecipeForm from './CreateRecipeForm';
import { useFetchUser } from 'lib/user';
import Loading from './notify/Loading';
import Router from 'next/router';
import { useCreateRecipeGraphQlMutation, RecipesGraphQlDocument } from 'generated/apollo-components';
import { useSubmitForm } from 'utils/submitForm';
import { Form } from 'antd';

export default function CreateRecipe() {
    const [form] = Form.useForm();
    const { user, loading: isFetchingUser } = useFetchUser();
    const owner = _get(user, 'sub') || '';

    const [createRecipeMutation, { loading }] = useCreateRecipeGraphQlMutation();
    const onFinish = (values) => {
        createRecipeMutation({ variables: { data: { ...values, owner } }, refetchQueries: [{ query: RecipesGraphQlDocument }] });
    };
    const {
        initialValues,
        ingredients,
        status,
        handleAddIngredient,
        handleDeleteIngredient,
        handleDropDownStatusChange,
        handleDropDownUnitChange,
        handleInputChange,
        handleSubmitImages,
        onCreateFinish,
    } = useSubmitForm(
        form,
        {
            title: '',
            description: '',
            content: '',
            ingredients: [],
            status_: '',
            images: {},
        },
        onFinish,
    );

    if (isFetchingUser) {
        return <Loading />;
    }
    if (!user) {
        Router.replace('/');
    }
    return (
        <CreateRecipeForm
            form={form}
            initialValues={initialValues}
            ingredients={ingredients}
            status={status}
            loading={loading}
            onFinish={onCreateFinish}
            handleAddIngredient={handleAddIngredient}
            handleDeleteIngredient={handleDeleteIngredient}
            handleDropDownUnitChange={handleDropDownUnitChange}
            handleInputChange={handleInputChange}
            handleDropDownStatusChange={handleDropDownStatusChange}
            handleSubmitImages={handleSubmitImages}
        />
    );
}
