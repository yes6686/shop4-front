import { Wheel } from "react-custom-roulette"; // 룰렛 import
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listCoupons, deleteCoupon } from "../services/CouponService";
import { distributeCoupon } from "../services/UserCouponService";

function CouponRoulette() {
  const userSession = JSON.parse(sessionStorage.getItem("user")); // 세션에서 사용자 이름 가져오기
  let navigate = useNavigate();
  // 1. 쿠폰 종류 읽어오기
  const [coupon, setCoupon] = useState([]);
  const [data, setData] = useState([]); // 룰렛에 쓸 데이터를 따로 저장

  // 룰렛이 회전 애니메이션을 시작
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null); // 당첨 인덱스
  const [isCoupon, setIsCoupon] = useState(false);

  const [loading, setLoading] = useState(true); // 로딩 상태 초기값을 true로 설정

  const getAllCoupon = async () => {
    setLoading(true); // 데이터 가져오기 시작
    try {
      const res = await listCoupons();
      setIsCoupon(true);
      const couponList = res.data;

      const validCoupons = couponList.filter((item) => item.count > 0);
      if (validCoupons.length === 0) {
        setIsCoupon(false);
        alert("사용 가능한 쿠폰이 없습니다.");
        setLoading(false);
        return;
      }
      setCoupon(validCoupons);

      const rouletteData = validCoupons.map((item, idx) => {
        let percentage;
        if (item.discount >= 50) {
          percentage = 10;
        } else if (item.discount >= 30) {
          percentage = 25;
        } else {
          percentage = 35;
        }
        return {
          option: item.name,
          style:
            idx % 2 === 0
              ? { backgroundColor: "gray", textColor: "white" }
              : { backgroundColor: "blue", textColor: "white" },
          percentage: percentage,
        };
      });
      setData(rouletteData);
    } catch (error) {
      console.error("쿠폰 목록을 가져오는 데 실패했습니다:", error);
      setIsCoupon(false);
      alert("쿠폰 목록을 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false); // 데이터 가져오기 완료
    }
  };

  useEffect(() => {
    if (!isCoupon) {
      getAllCoupon();
    }
  }, [isCoupon]);

  useEffect(() => {
    console.log("current data:", data);
    console.log("current coupon:", coupon);
  }, [data, coupon]);

  // 룰렛 애니메이션을 실행시킬 함수
  const handleSpinClick = () => {
    if (!mustSpin && data.length > 0) {
      // 데이터가 있을 때만 실행
      const pivot = Math.floor(Math.random() * 99 + 1);
      let stack = 0; // 가중치

      let percentage = data.map((row) => row.percentage);

      let newPrizeNumber = null; // 당첨 인덱스

      percentage.some((row, idx) => {
        stack += row;
        if (pivot <= stack) {
          newPrizeNumber = idx;
          return true;
        }
      });
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  // 룰렛 애니메이션이 멈출 때 실행되는 함수
  const StopSpinning = () => {
    setMustSpin(false);
    distributeUserCoupon();
    if (prizeNumber !== null && prizeNumber >= 0 && coupon[prizeNumber]) {
      console.log(coupon[prizeNumber].name + "이 당첨되셨습니다");
    } else {
      console.error("유효하지 않은 prizeNumber:", prizeNumber);
    }
    alert(coupon[prizeNumber].name + "이 당첨되셨습니다");
    navigate("/myCoupons");
  };

  const distributeUserCoupon = async () => {
    if (prizeNumber !== null && coupon[prizeNumber]) {
      // prizeNumber가 유효한지 확인
      await distributeCoupon(userSession.id, coupon[prizeNumber].id);
    }
  };
  return (
    <>
      <div>
        {loading ? ( // 로딩 중일 때
          <div>로딩 중...</div>
        ) : isCoupon ? ( // 쿠폰이 있을 때
          <>
            <Wheel
              spinDuration={0.2}
              startingOptionIndex={Math.floor(Math.random() * data.length)}
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={StopSpinning}
            />
            <button onClick={handleSpinClick}>SPIN</button>
          </>
        ) : (
          // 쿠폰이 없을 때
          <div>사용 가능한 쿠폰이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default CouponRoulette;
