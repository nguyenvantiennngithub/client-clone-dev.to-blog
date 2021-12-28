import React from 'react';
import {Navbar, Input, Nav, NavItem, Button, Container} from 'reactstrap'
import './Header.scss'
import LoggedIn from './LoggedIn';
import Login from './Login/'
import {useSelector} from 'react-redux'
import {loginUser$} from '../../redux/selectors/'
import { Link } from 'react-router-dom';
function Header(){

    const {token} = useSelector(loginUser$);

    return (
        <header className="header">
            <Container style={{paddingLeft: '0px', paddingRight: '0px'}}>
                <Navbar light>
                    <Nav>
                        <Link to='/' className='header__logo'>
                            <NavItem>
                                VanTiennn
                            </NavItem>
                        </Link>
                        <NavItem>
                            <Input className="header__search" placeholder="Search..."></Input>
                        </NavItem>
                        <NavItem>
                            <Button className="ml-8">Search</Button>
                        </NavItem>
                    </Nav>
                    {(token) ? <LoggedIn/> : <Login/>}                
                </Navbar>
            </Container>
        </header>

    )
}

export default Header;