
import { SettingFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Menu } from 'antd';


interface Iprops {
    logout: () => void;
 }

export default function Settings({logout}: Iprops) {

    const items: MenuProps['items'] = [
        {
            label: <Menu>
                <Menu.Item onClick={logout}>로그아웃</Menu.Item>
            </Menu>,
            key: '0',
        },
    ];


    return (
        <Dropdown 
        menu={{ items }} trigger={['click']}>
            <Button shape='circle' icon={<SettingFilled/>}/>
        </Dropdown>
    );
}
