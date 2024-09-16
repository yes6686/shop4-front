import AdminMenu from "./admin/AdminMenu.js";
import AdminHome from "./admin/AdminHome.js";
import { Route, Routes } from "react-router-dom";
import MemberManagement from "./admin/MemberManagement.js";
import GoodsManagement from "./admin/GoodsManagement.js";

function Admin() {
  return (
    <div style={{ height: "1000px", margin: "0 auto", display: "flex" }}>
      <AdminMenu></AdminMenu>
      <Routes>
        <Route path="" element={<AdminHome />}></Route>
        <Route
          path="/members"
          element={<MemberManagement></MemberManagement>}
        ></Route>
        <Route
          path="/goods"
          element={<GoodsManagement></GoodsManagement>}
        ></Route>
      </Routes>
    </div>
  );
}

export default Admin;
