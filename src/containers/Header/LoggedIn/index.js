import { Link } from "react-router-dom";
import { Button, Nav, NavItem } from "reactstrap";
import { BsBell } from 'react-icons/bs';

import './LoggedIn.scss'
import Avatar from "./Avatar";
function LoggedIn(){
    return (
        <Nav>
            <NavItem>
                <Link to="/create-post">
                    <Button className="fw500" outline color="primary">Create post</Button>
                </Link>
            </NavItem>
            <NavItem className="loggedIn__icons">
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