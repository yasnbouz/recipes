import { Form, Input, Dropdown, Button, Row, Col } from 'antd';
import MenuList from './MenuList';

export const GenerateInput = ({ name }: { name: string }) => (
    <Row>
        <Col span={12} offset={6}>
            <Form.Item label={`${name}`} name={`${name}`} rules={[{ required: true }]}>
                <Input placeholder={`${name}`} />
            </Form.Item>
        </Col>
    </Row>
);

export const GenerateTextInput = ({ name }: { name: string }) => (
    <Row>
        <Col span={12} offset={6}>
            <Form.Item label={`${name}`} name={`${name}`}>
                <Input.TextArea rows={4} placeholder={`${name}`} />
            </Form.Item>
        </Col>
    </Row>
);
type DropDownProps = {
    name: string;
    status: string;
    statusList: string[];
    handleDropDownChange: (value: string) => void;
};
export const GenerateDropDown = ({ name, status, statusList, handleDropDownChange }: DropDownProps) => (
    <Col span={4} offset={6}>
        <Form.Item label={`${name}`} name={`${name}`}>
            <Dropdown
                overlay={<MenuList handleDropDownChange={handleDropDownChange} iterableList={statusList} />}
                placement="bottomLeft"
                arrow
            >
                <Button>{status}</Button>
            </Dropdown>
        </Form.Item>
    </Col>
);
