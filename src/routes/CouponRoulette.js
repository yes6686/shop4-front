import { Wheel } from "react-custom-roulette"; // 룰렛 import
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listCoupons } from "../services/CouponService";
import { distributeCoupon } from "../services/UserCouponService";
import styles from "./css/CouponRoulette.module.css"; // 스타일을 위한 CSS 파일 import

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
    setLoading(true);
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

      const totalWeight = validCoupons.reduce((acc, item) => {
        return acc + (item.discount >= 50 ? 10 : item.discount >= 30 ? 25 : 35);
      }, 0);
      // 밝은 파스텔톤 색상 적용
      const rouletteData = validCoupons.map((item, idx) => {
        let percentage;
        if (item.discount >= 50) {
          percentage = (10 / totalWeight) * 100; // 예: 할인률이 50 이상인 쿠폰
        } else if (item.discount >= 30) {
          percentage = (25 / totalWeight) * 100; // 예: 할인률이 30 이상인 쿠폰
        } else {
          percentage = (35 / totalWeight) * 100; // 예: 그 외의 쿠폰
        }

        // 밝고 생동감 있는 색상 적용
        const colors = [
          "#FFCDD2",
          "#F8BBD0",
          "#E1BEE7",
          "#D1C4E9",
          "#C5CAE9",
          "#BBDEFB",
          "#B3E5FC",
          "#B2EBF2",
          "#B2DFDB",
          "#C8E6C9",
          "#DCEDC8",
          "#F0F4C3",
          "#FFF9C4",
          "#FFECB3",
          "#FFE0B2",
          "#FFCCBC",
          "#D7CCC8",
          "#CFD8DC",
        ];

        return {
          option: item.name,
          style: {
            backgroundColor: colors[idx % colors.length], // 밝은 색상 순환 적용
            textColor: "#000", // 밝은 배경에 잘 보이도록 검정 텍스트 적용
          },
          percentage: percentage,
        };
      });
      setData(rouletteData);
    } catch (error) {
      console.error("쿠폰 목록을 가져오는 데 실패했습니다:", error);
      setIsCoupon(false);
      alert("쿠폰 목록을 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCoupon(); // 처음에 한 번만 쿠폰 데이터를 가져옴
  }, []);

  useEffect(() => {
    console.log("current data:", data);
    console.log("current coupon:", coupon);
  }, [data, coupon]);

  // 룰렛 애니메이션을 실행시킬 함수
  const handleSpinClick = () => {
    if (!mustSpin && data.length > 0) {
      const pivot = Math.random() * 100; // 0~1 값으로 확률 계산
      let stack = 0;
      let newPrizeNumber = null;

      data.some((row, idx) => {
        stack += row.percentage;
        if (pivot <= stack) {
          newPrizeNumber = idx;
          return true;
        }
      });

      if (newPrizeNumber !== null) {
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      } else {
        alert("다시 시도하십시오.");
        navigate("/couponRoulette");
      }
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
      try {
        await distributeCoupon(userSession.id, coupon[prizeNumber].id);
      } catch (error) {
        console.error("쿠폰 배포에 실패했습니다:", error);
        alert("쿠폰 배포에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };
  return (
    <>
      <div className={styles.rouletteContainer}>
        {loading ? (
          <div>로딩 중...</div>
        ) : isCoupon ? (
          <>
            <div className={styles.wheelContainer}>
              <Wheel
                spinDuration={0.4}
                startingOptionIndex={Math.floor(Math.random() * data.length)}
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={StopSpinning}
              />
              <button className={styles.spinButton} onClick={handleSpinClick}>
                돌리기
              </button>
            </div>
          </>
        ) : (
          <div>사용 가능한 쿠폰이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default CouponRoulette;
