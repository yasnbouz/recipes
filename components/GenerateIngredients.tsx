import { Row, Col, Button, Table, Input, Dropdown } from 'antd';
import { Form } from 'antd';
import MenuList from './MenuList';

type IngredientsProps = {
    names?: string[];
    values: { amount: string; unit: string; type: string }[];
    handleAddIngredient: (event: any) => void;
    handleDeleteIngredient: (key: number) => void;
    handleInputChange?: (event: any) => void;
    handleDropDownChange?: (item: string, index: number) => void;
};
const units = ['-', 'ounce', 'lb', 'cup', 'tb', 'tsp', 'g', 'kg'];
export const GenerateIngredients = ({
    names,
    values,
    handleAddIngredient,
    handleDeleteIngredient,
    handleDropDownChange,
    handleInputChange,
}: IngredientsProps) => {
    const columns = names
        .map((name) => ({
            title: name,
            dataIndex: name,
            key: name,
            render: function IngredientCol(_, record, index: number) {
                return name === 'unit' ? (
                    <Dropdown
                        placement="bottomLeft"
                        overlay={<MenuList iterableList={units} index={index} handleDropDownChange={handleDropDownChange} />}
                    >
                        <Button>{record[name]}</Button>
                    </Dropdown>
                ) : (
                    <Input placeholder={name} data-index={index} name={name} onChange={handleInputChange} />
                );
            },
        }))
        .concat([
            {
                title: 'delete',
                dataIndex: 'delete',
                key: 'delete',
                render: function deleteCol(_, record, index: number) {
                    return (
                        <Button onClick={() => handleDeleteIngredient(index)} type="primary" size="small" danger shape="circle">
                            -
                        </Button>
                    );
                },
            },
        ]);
    return (
        <>
            <Row>
                <Col span={12} offset={6}>
                    <p>
                        <Button onClick={handleAddIngredient} type="primary" shape="circle" size="small">
                            +
                        </Button>
                        {` Ingredients:`}
                    </p>
                </Col>
            </Row>
            {values.length > 0 && (
                <Row>
                    <Col span={12} offset={6}>
                        <Form.Item name="ingredients">
                            <Table pagination={{ pageSize: 10 }} dataSource={values} columns={columns} />
                        </Form.Item>
                    </Col>
                </Row>
            )}
        </>
    );
};
