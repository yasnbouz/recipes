import { useRouter } from 'next/router';

import { Form } from 'antd';
import _get from 'lodash/get';

import { useCreateRecipeGraphQlMutation, RecipesGraphQlDocument } from 'generated/apollo-components';
import { useUser } from 'lib/user';
import { useSubmitForm } from 'utils/submitForm';

import CreateRecipeForm from './CreateRecipeForm';
import Loading from './notify/Loading';

export default function CreateRecipe() {
    const [form] = Form.useForm();
    const { user, loading: isFetchingUser } = useUser();
    const router = useRouter();

    const owner = _get(user, 'sub') || '';

    const [createRecipeMutation, { loading }] = useCreateRecipeGraphQlMutation();
    const onFinish = async (values) => {
        await createRecipeMutation({
            variables: { data: { ...values, owner } },
            refetchQueries: [{ query: RecipesGraphQlDocument }, { query: RecipesGraphQlDocument, variables: { where: { owner } } }],
        });
        router.push('/my-recipes');
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
            status_: 'DRAFT',
            images: {},
        },
        onFinish,
    );

    if (isFetchingUser) {
        return <Loading />;
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
