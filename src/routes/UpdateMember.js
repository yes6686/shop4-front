import './UpdateMember.css'
import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function UpdateMember() {
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

    console.log(user);
    return(
        <>
        <h2>마이페이지</h2><br/><hr/>
        
        <div className="table-wrapper">
            <table className="table myPageTable">
                <tbody>
                    {[
                        { label: '아이디', value: user.userId, editable: false },
                        { label: '비밀번호', value: user.userPw, editable: true },
                        { label: '이름', value: user.name, editable: true },
                        { label: '연락처', value: user.phone, editable: true },
                        { label: '주소', value: user.address, editable: true },
                        { label: '이메일', value: user.email, editable: true }
                    ].map((item, index) => (
                        <tr key={index} style={index === 0 ? { borderTop: '2px solid #000' } : {}}>
                            <th scope="row">{item.label}</th>
                            <td>
                                {item.editable ? (
                                    <input type="text" 
                                        className="form-control"
                                        defaultValue={item.value} />
                                ) : (
                                    item.value
                                )}
                                <button>변경</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>




        {/* <form>
            <div className="inputList" style={{margin : '15px;'}}>
                <label for="name">이름:</label>
                <input type="text" id="name" name="name" value="김문권" />
            </div>
            
            <div className="inputList">
                <label for="email">이메일:</label>
                <input type="email" id="email" name="email" value="ok63477@gmail.com" />
            </div>
            
            <div className="inputList">
                <label for="address">주소:</label>
                <input type="text" id="address" name="address" value="동대문" />
            </div>
            
            <div className="inputList">
                <label for="phone">전화번호:</label>
                <input type="tel" id="phone" name="phone" value="010-5665-5745" />
            </div>
            
            <div className="inputList">
                <label for="age">나이:</label>
                <input type="number" id="age" name="age" value="24" />
            </div>
            
            <div className="inputList">
                <label for="birth">생일:</label>
                <input type="date" id="birth" name="birth" value="2001-12-08" />
            </div>
            
            <div className="inputList">
                <label for="gender">성별:</label>
                <input type="text" id="gender" name="gender" value="Male" />
            </div>
            
            <div className="inputList">
                <label for="userId">아이디:</label>
                <input type="text" id="userId" name="userId" value="admin" />
            </div>
            
            <div className="inputList">
                <label for="userPw">비밀번호:</label>
                <input type="password" id="userPw" name="userPw" value="admin1234" />
            </div>
        </form>   */}
        </>
    )
}

export default UpdateMember;