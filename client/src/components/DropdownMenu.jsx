import { Dropdown } from 'antd';
import { useLocation, Link, useNavigate, Routes, Route } from "react-router-dom";


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
            <Link >Logout</Link>
        ),
    },
];

function DropdownMenu() {
    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottom"
            arrow
        >
            <img className="rounded-2xl h-10 mt-1 w-14" src="https://plus.unsplash.com/premium_photo-1661302846246-e8faef18255d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRtaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="image comes here.." />
        </Dropdown>
    )
}

export default DropdownMenu