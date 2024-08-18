import './Login.css'


function Login() {
  
  return (
      <>
        <form className="memberForm">
          
          <div className="mb-3">
            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="아이디"/>
          </div>
          
          <div className="mb-3">
            <input type="password" className="form-control" id="inputUserPw" placeholder="비밀번호"/>
          </div>
          
          <div className="mb-3 form-check">
            <input type="checkbox" className="member" id="checkId"/>
            <label for="checkId">아이디 저장</label>
            
            <input type="checkbox" className="member" id="autoLogin"/>
            <label for="autoLogin">자동로그인</label>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
          
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