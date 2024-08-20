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

    const user = JSON.parse(sessionStorage.getItem('user')); // 세션에서 사용자 이름 가져오기
    const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // 로그인 여부 확인

    const handleLogout = () => {
        // 로그아웃 처리 로직 예시
        sessionStorage.removeItem('isLoggedIn'); // 로그인 상태 제거
        sessionStorage.removeItem('user'); // 사용자 정보 제거
        // 로그아웃 후 페이지 리다이렉션
        navigate('/');
    };

    const handleLogin = () => {
        // 로그인 페이지로 이동하는 로직
        navigate('/login');
    };

    return (
        <div className="App">
            <Navbar bg="success" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/')}>Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                    </Nav>
                    {/* 사용자 이름 표시 */}
                    <Nav className="ms-auto">
                        <Dropdown>
                            <Dropdown.Toggle
                                className="user-name"
                                variant="success"
                                id="dropdown-basic"
                                style={{ cursor: 'pointer' }}
                            >
                                {/* 로그인 되어있을땐 유저이름, 안되어있으면 마이쇼핑 */}
                                {isLoggedIn ? user.name+'님' : '마이 쇼핑'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="custom-dropdown-menu">
                                <Dropdown.Item onClick={() => handleNavigation('/mypage')}>
                                    마이페이지
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleNavigation('/cart')}>
                                    장바구니
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleNavigation('/recentlyViewed')}>
                                    최근 본 상품
                                </Dropdown.Item>
                                {/* You can add more items here */}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* 로그인 되어 있으면 유저이름이랑 로그아웃 버튼,
                            안되어 있으면 로그인 버튼만! */}
                        {isLoggedIn ? ( 
                            <Nav.Item className="me-2">
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-light"
                                    style={{ cursor: 'pointer'

                                }}>로그아웃
                                </button>
                            </Nav.Item>
                        ) : (
                            <Nav.Item className="me-3">
                                <button
                                    onClick={handleLogin}
                                    className="btn btn-outline-light"
                                    style={{ cursor: 'pointer' }}
                                >
                                    로그인
                                </button>
                            </Nav.Item>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
