import { Menu } from 'antd';

type MenuListProps = {
    iterableList: string[];
    index?: number;
    handleDropDownChange: (value: string, index?: number) => void;
};
export default function MenuList({ iterableList, handleDropDownChange, index }: MenuListProps) {
    return (
        <Menu>
            {iterableList.map((item) => (
                <Menu.Item onClick={() => handleDropDownChange(item, index)} key={`${item}`} title={item}>
                    {item}
                </Menu.Item>
            ))}
        </Menu>
    );
}
