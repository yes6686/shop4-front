import { Wheel } from "react-custom-roulette"; // 룰렛 import
import React, { useState } from "react";
import { listCoupons } from "../services/CouponService";
import { distributeCoupon } from "../services/UserCouponService";

function CouponRoulette() {
  const userSession = JSON.parse(sessionStorage.getItem("user")); // 세션에서 사용자 이름 가져오기

  // 1. 쿠폰 종류 읽어오기
  const [coupon, setCoupon] = useState([]);
  const [data, setData] = useState([]); // 룰렛에 쓸 데이터를 따로 저장
  useState(() => {
    const getAllCoupon = async () => {
      const res = await listCoupons();
      let couponList = res.data;
      setCoupon(couponList);

      // count가 0보다 큰 쿠폰만 필터링
      const validCoupons = couponList.filter((item) => item.count > 0);

      // 쿠폰 데이터를 룰렛 data 형식으로 변환
      const rouletteData = validCoupons.map((item, idx) => {
        // discount 값에 따른 percentage 설정
        let percentage;
        if (item.discount >= 50) {
          percentage = 10; // 50% 이상의 할인일 경우 10%
        } else if (item.discount >= 30) {
          percentage = 25; // 30% 이상의 할인일 경우 20%
        } else {
          percentage = 35; // 나머지 경우 30%
        }

        return {
          option: item.name, // 쿠폰 이름
          // 스타일을 번갈아가며 설정 (짝수, 홀수)
          style:
            idx % 2 === 0
              ? { backgroundColor: "gray", textColor: "white" } // 짝수 스타일
              : { backgroundColor: "blue", textColor: "white" }, // 홀수 스타일
          percentage: percentage, // 임의로 20% 설정 (필요시 조정 가능)
        };
      });

      setData(rouletteData);
    };
    getAllCoupon();
  }, [coupon]);
  // 2. 뽑기 진행

  //룰렛 데이터

  //룰렛이 회전 애니메이션을 시작
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0); //당첨 인덱스

  // 룰렛 애니메이션을 실행시킬 함수
  const handleSpinClick = () => {
    if (!mustSpin) {
      // 가중치 랜덤 알고리즘(Weighted Random Picker) 적용
      // 1. 랜덤 기준점 설정
      const pivot = Math.floor(Math.random() * 99 + 1);
      let stack = 0; // 가중치

      let percentage = data.map((row, idx) => {
        {
          return row.percentage;
        }
      });

      let newPrizeNumber = null; //당첨 인덱스

      percentage.some((row, idx) => {
        //2. 가중치 누적
        stack += row;

        // 3. 누적 가중치 값이 기준점 이상이면 종료
        if (pivot <= stack) {
          newPrizeNumber = idx;
          return true;
        }
      });
      // 당첨 인덱스를 가리킴
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  // 3. 쿠폰 매핑 시켜
  // 룰렛 애니메이션이 멈출 때 실행되는 함수
  const StopSpinning = () => {
    setMustSpin(false);
    distributeUserCoupon();
    alert(coupon[prizeNumber].name + "이 당첨되셨습니다");
  };

  const distributeUserCoupon = async () => {
    await distributeCoupon(userSession.id, coupon[prizeNumber].id);
  };

  return (
    <>
      <div>
        {data.length > 0 ? ( // 데이터가 있을 때만 Wheel 컴포넌트 렌더링
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
