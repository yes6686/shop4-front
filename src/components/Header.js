import './../App.css';
import React from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const state = useSelector((state) => state);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="App">
            <Navbar bg="success" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/')}>Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate('/Cart')}>Cart</Nav.Link>
                    </Nav>
                    {/* 사용자 이름 표시 */}
                    {state.user && (
                        <Nav className="ms-auto">
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="user-name"
                                    variant="success"
                                    id="dropdown-basic"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {state.user}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="custom-dropdown-menu">
                                    <Dropdown.Item onClick={() => handleNavigation('/mypage')}>
                                        My Page
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleNavigation('/Cart')}>
                                        Cart
                                    </Dropdown.Item>
                                    {/* You can add more items here */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
