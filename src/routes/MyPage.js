import './MyPage.css'
import React, { useEffect } from 'react'
import { Image} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

const MyPage = () => {  
    const user = JSON.parse(sessionStorage.getItem('user')); // 세션에서 사용자 이름 가져오기
    const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // 로그인 여부 확인
    
    
    let navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn || !user) {
            alert('로그인을 하셔야합니다.')
            navigate('/login'); // 로그인되지 않았거나 사용자 정보가 없는 경우 로그인 페이지로 이동
            return;
        }
    }, [isLoggedIn, user, navigate]);

    // user 객체가 null일 경우를 대비한 체크
    if (!user) {
        return null; // user가 null일 경우 컴포넌트를 렌더링하지 않음
    }
    

    return (
        <>
        <div>
            <h2 className="myPageTitle">마이페이지</h2><br/><hr/>
            
            <div className="table-wrapper">
            <table className="table myPageTable">
                <tbody>
                    {[
                        { label: '아이디', value: user.userId },
                        { label: '이름', value: user.name },
                        { label: '연락처', value: user.phone },
                        { label: '주소', value: user.address },
                        { label: '이메일', value: user.email },
                        { label: '잔액', value: user.cash+'원' }
                    ].map((item, index) => (
                        <tr key={index} style={index === 0 ? { borderTop: '2px solid #000' } : {}}>
                            <th scope="row">{item.label}</th>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default MyPage