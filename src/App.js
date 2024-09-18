import "./App.css";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Cart from "./routes/Cart";
import MyPage from "./routes/MyPage";
import RecentlyViewed from "./routes/RecentlyViewed";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Payment from "./routes/Payment";
import LoginHandeler from "./components/LoginHandeler";
import AddGoods from "./routes/AddGoods";
import UserManagement from "./routes/UserManagement";
import FriendsList from "./routes/FriendsList";
import RequestedFriends from "./routes/RequestedFriends";
import SignUpSuccess from "./routes/SignUpSuccess";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/friendsList" element={<FriendsList />} />
        <Route path="/requestedFriends" element={<RequestedFriends />} />
        <Route path="/recentlyViewed" element={<RecentlyViewed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/signUpSuccess" element={<SignUpSuccess />} />
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
