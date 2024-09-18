import MemberManagement from './MemberManagement.js';
import GoodsManagement from './GoodsManagement';
import Reports from './Reports.js';
import styles from './admincss/Admin.module.css';

function AdminHome() {
	return (
		<div className={styles.member_container} style={{ margin: '0 auto' }}>
			<MemberManagement></MemberManagement>
			<GoodsManagement></GoodsManagement>
			<Reports></Reports>
		</div>
	);
}

export default AdminHome;
