import { Link } from "react-router-dom";
import { Badge, Button, Nav, NavItem } from "reactstrap";
import { BsBell } from 'react-icons/bs';

import './LoggedIn.scss'
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
function LoggedIn(){
    const {totalUnread} = useSelector(state => state.notification)
    return (
        <Nav>
            <NavItem>
                <Link to="/create-post">
                    <Button className="fw500" outline color="primary">Create post</Button>
                </Link>
            </NavItem>
            <NavItem className="loggedIn__icons">
                {totalUnread > 0 && <Badge color="danger" pill className="loggedIn__icons-count">{totalUnread}</Badge>}
                <Link to="/notification">
                    <BsBell className="loggedIn__icons-bell"></BsBell>
                </Link>
            </NavItem>
            <NavItem>
                <Avatar/>
            </NavItem>
        </Nav>
    )
}

export default LoggedIn;