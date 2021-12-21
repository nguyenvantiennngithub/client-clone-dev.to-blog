import { Link } from "react-router-dom";
import { Button, Nav, NavItem } from "reactstrap";


function Login(){
    return (
        <Nav>
            <NavItem>
                <Link to="/login" style={{marginRight: '16px'}}>
                    <Button className="fw500" outline>Log in</Button>
                </Link>
            </NavItem>
            <NavItem>
                <Link to="/register">
                    <Button className="ml-8 fw500" color="primary">Create account</Button>
                </Link>
            </NavItem>
        </Nav>
    )
}

export default Login;