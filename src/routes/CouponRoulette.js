import { Wheel } from "react-custom-roulette"; // 룰렛 import
import React, { useState, useEffect } from "react";
import { listCoupons, deleteCoupon } from "../services/CouponService";
import { distributeCoupon } from "../services/UserCouponService";

function CouponRoulette() {
  const userSession = JSON.parse(sessionStorage.getItem("user")); // 세션에서 사용자 이름 가져오기

  // 1. 쿠폰 종류 읽어오기
  const [coupon, setCoupon] = useState([]);
  const [data, setData] = useState([]); // 룰렛에 쓸 데이터를 따로 저장

  // 룰렛이 회전 애니메이션을 시작
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0); // 당첨 인덱스
  const [isCoupon, setIsCoupon] = useState(false);

  const getAllCoupon = async () => {
    try {
      const res = await listCoupons(); // await 키워드로 비동기 처리
      setIsCoupon(true);
      const couponList = res.data; // 여기가 문제일 수 있음

      // count가 0보다 큰 쿠폰만 필터링
      const validCoupons = couponList.filter((item) => item.count > 0);
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
      setIsCoupon(false); // 데이터를 가져오지 못했으므로 false로 설정
    }
  };

  useEffect(() => {
    getAllCoupon();
  }, [mustSpin]);

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
    if (data.length > 0) {
      alert(coupon[prizeNumber].name + "이 당첨되셨습니다");
    }
  };

  const distributeUserCoupon = async () => {
    if (prizeNumber !== null && coupon[prizeNumber]) {
      // prizeNumber가 유효한지 확인
      await distributeCoupon(userSession.id, coupon[prizeNumber].id);
    }
  };

  console.log(data);
  console.log(coupon);
  return (
    <>
      <div>
        {isCoupon ? ( // 데이터가 있을 때만 Wheel 컴포넌트 렌더링
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
          <div>No data available for the wheel.</div> // 데이터가 없을 때 처리
        )}
      </div>
    </>
  );
}

export default CouponRoulette;
