import './Login.css'
import {useState} from 'react'
import axios from 'axios'

function Login() {
  
   



  let [userId,setUserId] = useState();
  let [userPw,setUserPw] = useState();

  const userIdChange = (e) => setUserId(e.target.value);
  const userPwChange = (e) => setUserPw(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/members/login", {
      userId : userId,
      userPw : userPw
    })
    .then((res)=>{
      console.log("로그인 요청 성공!");
    })
    .catch(function(error) {
      console.log("로그인 요청 실패!");
    })
    
    
  }



  return (
      <>
        <form className="memberForm" onSubmit={onSubmit} encType="multipart/form">
          
          <div className="mb-3">
            <input type="text" value={userId} onChange={userIdChange} placeholder="아이디"/>
          </div>
          
          <div className="mb-3">
            <input type="password" value={userPw} onChange={userPwChange} placeholder="비밀번호"/>
          </div>
          
          <div className="mb-3 form-check">
            <input type="checkbox" className="member" id="checkId"/>
            <label for="checkId">아이디 저장</label>
            
            <input type="checkbox" className="member" id="autoLogin"/>
            <label for="autoLogin">자동로그인</label>
          </div>
          
          <button type="submit" value="user login">Submit</button>
          
          <ul className="findRemove">
            <li>아이디/비밀번호 찾기</li>    
            <li>휴면해제</li>
            <li>회원가입</li>
          </ul>

        </form>
        
        
      </>
  )
}

export default Login;