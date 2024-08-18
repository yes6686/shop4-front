import './../App.css'
import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    let state = useSelector((state)=> { return state})

    return(
    <div className="App">
    <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/Cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/Cart')}}>Cart</Nav.Link>
          </Nav>
          {/* 사용자 이름 표시 */}
          {state.user && (
                        <Nav className="ms-auto">
                            <Navbar.Brand className="user-name" disabled onClick = {() => {{navigate('/user')}}}>{state.user}</Navbar.Brand>
                        </Nav>
                    )}
        </Container>
    </Navbar>
    </div>
    );
    
}

export default Header