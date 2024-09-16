import MemberManagement from "./MemberManagement.js";
import GoodsManagement from "./GoodsManagement";

function AdminHome() {
  return (
    <div style={{ margin: "0 auto" }}>
      <MemberManagement></MemberManagement>
      <GoodsManagement></GoodsManagement>
    </div>
  );
}

export default AdminHome;
