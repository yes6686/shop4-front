import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <div style={{ width: "20%", border: "1px solid red" }}>
      <ul>
        <li>
          <Link to="/admin">대시보드</Link>
        </li>
        <li>
          <Link to="/admin/members">유저관리</Link>
        </li>
        <li>
          <Link to="/admin/goods">상품관리</Link>
        </li>
        <li>
          <Link to="/admin">통계</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
