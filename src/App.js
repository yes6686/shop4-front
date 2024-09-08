import './App.css';

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import MyPage from './routes/MyPage';
import RecentlyViewed from './routes/RecentlyViewed';
import Direct from './routes/Direct';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Payment from './routes/Payment';
import LoginHandeler from './components/LoginHandeler';
import AddGoods from './routes/AddGoods';
import UserManagement from './routes/UserManagement';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/myPage" element={<MyPage />} />
				<Route path="/recentlyViewed" element={<RecentlyViewed />} />
				<Route path="/direct" element={<Direct />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/payment" element={<Payment />} />
				<Route path="/addgoods" element={<AddGoods />}></Route>
				<Route path="/userManagement" element={<UserManagement />}></Route>
				<Route path="/login/kakao" element={<LoginHandeler />} />
			</Routes>
			{/* footer 박스로 클릭안되는 현상 처리 */}
			<br />
			<br />
			<br />
			{/* <Footer /> */}
		</>
	);
}

export default App;
