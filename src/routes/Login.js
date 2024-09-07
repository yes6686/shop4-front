import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS 파일을 임포트
import kakaoImg from '../images/kakao_login.png';
import { KAKAO_AUTH_URL } from '../oauth/Oauth';

function Login() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const userIdChange = (e) => setUserId(e.target.value);
    const userPwChange = (e) => setUserPw(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8080/api/members/login', {
                userId: userId,
                userPw: userPw,
            })
            .then((res) => {
                sessionStorage.setItem('user', JSON.stringify(res.data));
                sessionStorage.setItem('isLoggedIn', true);
                navigate('/');
            })
            .catch(() => {
                alert('로그인에 실패하였습니다.');
                window.location.reload();
            });
    };

    return (
        <div>
            <form
                className="loginForm"
                onSubmit={onSubmit}
            >
                {/* 로그인 제목 */}
                <h2 className="loginTitle">로그인</h2>

                {/* 아이디 입력 칸 */}
                <div className="mb-3">
                    <input
                        type="text"
                        value={userId}
                        onChange={userIdChange}
                        className="form-control"
                        placeholder="아이디"
                        required
                    />
                </div>

                {/* 비밀번호 입력칸 */}
                <div className="mb-3">
                    <input
                        type="password"
                        value={userPw}
                        onChange={userPwChange}
                        className="form-control"
                        placeholder="비밀번호"
                        required
                    />
                </div>

                {/* 로그인 버튼 */}
                <button type="submit" className="btn btn-primary">
                    로그인
                </button>

                <div className="kakaobtn">
                    <a href={KAKAO_AUTH_URL}>
                        <img src={kakaoImg} alt="카카오 로그인" />
                    </a>
                </div>

                <ul className="findRemove">
                    <li onClick={() => navigate('/signUp')}>회원가입</li>
                </ul>
            </form>
        </div>
    );
}

export default Login;
