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
import FriendsList from "./routes/FriendsList";
import RequestedFriends from "./routes/RequestedFriends";
import Admin from "./routes/admin/Admin";
import SignUpSuccess from "./routes/SignUpSuccess";
import PaymentSuccess from "./routes/PaymentSuccess";
import MyCoupons from "./routes/MyCoupons";
import CouponRoulette from "./routes/CouponRoulette";

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
        <Route path="/signUpSuccess" element={<SignUpSuccess />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login/kakao" element={<LoginHandeler />} />
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route path="/myCoupons" element={<MyCoupons />} />
        <Route path="/couponRoulette" element={<CouponRoulette />} />
      </Routes>
    </>
  );
}

export default App;
