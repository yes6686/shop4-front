import './SignUp.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {createMember, getMember} from '../services/MemberService'

function SignUp() {

    const navigate = useNavigate();

    let [userId,setUserId] = useState("");
    let [userPw,setUserPw] = useState("");
    let [userName,setUserName] = useState("");
    let [userPhone, setUserPhone] = useState("");
    let [userEmail,setUserEmail] = useState("");
    let [userAdress, setUserAdress] = useState("");
    let [userAge,setUserAge] = useState("");
    let [userBirth, setUserBirth] = useState("");
    let [userGender,setUserGender] = useState("");


    // 회원 정보 입력받는 함수
    const userIdChange = (e) => setUserId(e.target.value);
    const userPwChange = (e) => setUserPw(e.target.value);
    const userNameChange = (e) => setUserName(e.target.value);
    const userPhoneChange = (e) => setUserPhone(e.target.value);
    const userEmailChange = (e) => setUserEmail(e.target.value);
    const userAdressChange = (e) => setUserAdress(e.target.value);
    const userBirthChange = (e) => setUserBirth(e.target.value);
    const userGenderChange = (e) => setUserGender(e.target.value);
    const userAgeChange = (e) =>{
        const value = e.target.value;

        // 숫자만 입력받도록 필터링
        if (!isNaN(value) && value.length <= 15) { // Long 타입은 15~19 자리수
            setUserAge(value);
        }
    }
    

    //formData를 JSON으로 변환하는 함수
    const formDataToJSON = (formData) => {
        const obj = {};
        formData.forEach((value, key) => {
        obj[key] = value;
        });
        return obj;
    };


    // 로그인 버튼 누르면 로그인 기능 실행
    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("userId", userId);
        formData.append("userPw", userPw);
        formData.append("name",userName);
        formData.append("phone",userPhone);
        formData.append("email",userEmail);
        formData.append("address",userAdress);
        formData.append("age",userAge);
        formData.append("birth",userBirth);
        formData.append("gender",userGender);

        const data = formDataToJSON(formData);  

        console.log(data);
        //포스트 요청으로 아이디 비밀번호 값 보내기
        createMember(data)
        .then((res)=>{
            alert("회원가입이 완료되었습니다.");
            console.log(res.data);
            // navigate('/');
        })
        .catch(function(error) {
        alert("회원가입에 실패하였습니다.");
        //window.location.reload();
        })
    }

    //중복확인 검사 함수
    const checkDuplicate = () => {
        getMember(userId)
        .then((res)=> {
            console.log("사용가능한 아이디입니다.")
        })
        .catch((error)=> {
            console.log("아이디가 중복되었습니다.")
        })
    }


    return(
        <>
            
            <form className="memberForm" onSubmit={onSubmit} encType="multipart/form">
                <h2 className="title">회원가입</h2> <br/> <br/>
                {/* 아이디 입력 칸 */}
                <div className="mb-3 d-flex align-items-center">
                    <input type="text" value={userId} onChange={userIdChange} 
                    className="form-control" placeholder="아이디"/>
                    <button type="button" className="btn btn-primary ms-2 btn-sm"
                    style={{ width: '100px', height : '100%',padding: '5px 10px', fontSize: '0.875rem' }}
                    onClick={checkDuplicate}
                    >중복 확인</button>
                </div>
                
                {/* 비밀번호 입력칸 */}
                <div className="mb-3">
                    <input type="text" value={userPw} onChange={userPwChange} 
                    className="form-control" placeholder="비밀번호"/>
                </div>

                {/* 회원 이름 */}
                <div className="mb-3">
                    <input type="text" value={userName} onChange={userNameChange} 
                    className="form-control" placeholder="이름"/>
                </div>

                {/* 휴대전화 */}
                <div className="mb-3">
                    <input type="text" value={userPhone} onChange={userPhoneChange} 
                    className="form-control" placeholder="휴대폰 번호"/>
                </div>

                {/* 이메일 */}
                <div className="mb-3">
                    <input type="text" value={userEmail} onChange={userEmailChange} 
                    className="form-control" placeholder="이메일"/>
                </div>

                {/* 주소 */}
                <div className="mb-3">
                    <input type="text" value={userAdress} onChange={userAdressChange} 
                    className="form-control" placeholder="주소"/>
                </div>

                {/* 나이 */}
                <div className="mb-3">
                    <input type="text" value={userAge} onChange={userAgeChange} 
                    className="form-control" placeholder="나이"/>
                </div>

                {/* 생일 */}
                <div className="mb-3">
                    <input type="date" value={userBirth} onChange={userBirthChange} 
                    className="form-control" placeholder="생일"/>
                </div>
                
                {/* 성별 */}
                <div className="mb-3">
                    <input type="text" value={userGender} onChange={userGenderChange} 
                    className="form-control" placeholder="성별"/>
                </div>


                {/* 로그인 버튼 */}
                <button type="submit" className="btn btn-primary"
                    value="user signUp">회원가입</button>
            </form>
        </>
    )
}

export default SignUp;
