import { useEffect, useState } from "react";
import { listMembers } from "../../services/MemberService";
import "./admincss/MemberManagement.css";

function UserManagement() {
  let [users, setUsers] = useState([]);
  let user1 = {
    name: "유정균",
    address: "서울",
    phone: "1234",
  };

  let user2 = {
    name: "안에잔",
    address: "서울",
    phone: "4321",
  };

  useEffect(() => {
    listMembers().then((response) => {
      setUsers(response.data);
    });
    console.log(users);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "inline-grid",
        textAlign: "center",
        border: "1px solid green",
      }}
    >
      <h2>회원 관리 페이지임</h2>
      <table className="member-table">
        <thead>
          <td>이름</td>
          <td>주소</td>
          <td>번호</td>
        </thead>
        {users.map((member) => {
          return (
            <tr>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.address}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default UserManagement;
