import React, { useEffect } from 'react'
import { Image} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

const MyPage = () => {  
    const user = JSON.parse(sessionStorage.getItem('user')); // 세션에서 사용자 이름 가져오기
    const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // 로그인 여부 확인

    let navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn || !user) {
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
            <div style={{border : '3px solid blue',  height : 'auto', display : "flex"}}>
                <div style={{width : '30%', border : '1px solid red', margin : '60px', float : "left", boxSizing : "border-box"}}>
                    <Image src="doraemon.jpg" rounded></Image>
                    <div style={{textAlign: 'center'}}>{user.name}</div>
                </div>

                <div style={{border : '1px solid red', width : '50%', margin : '60px', float : "right"}}>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>이름 : {user.name}</div>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>이메일 : {user.email} </div>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>주소 : {user.address}</div>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>전화번호 : {user.phone}</div>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>나이 : {user.age}</div>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>생일 : {user.birth}</div>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>성별 : {user.gender}</div>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.userid}</div>
                    <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.userpw}</div>
                </div>
            </div>
        </>
    )
}

export default MyPage