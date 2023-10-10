import { Dropdown } from 'antd';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserName } from '../providers/ContextProvider';

const items = [
    {
        key: '1',
        label: (
            <Link to={"/home/profile"}>profile</Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to={"/home/update-password"}>Update password</Link>

        ),
    },
    {
        key: '3',
        label: (
            <Link to={"/home/logout"}>Logout</Link>
        ),
    },
];

function DropdownMenu() {
    const { loginUser,file } = useContext(UserName)
    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottom"
            arrow
        >
            <img className="rounded-full h-10 w-10 mt-1" src={ loginUser.image ? `http://localhost:3000/images/${loginUser.image}` : file || "https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FydG9vbiUyMGNoYXJhY3RlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }/>
        </Dropdown>
    ) 
}

export default DropdownMenu