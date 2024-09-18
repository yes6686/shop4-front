import React, { useEffect } from "react";
import axios from "axios";

const requestPay = () => {
  const { IMP } = window;
  IMP.init("imp43064854");

  IMP.request_pay(
    {
      pg: "html5_inicis", // PG사 구분코드(string)
      pay_method: "card", // 결제수단 구분코드(string)
      merchant_uid: new Date().getTime(), // 고객사 주문번호(string)
      name: "테스트 상품", // 주문명(string)
      amount: 100, // 결제금액(number)
      buyer_name: "안예찬", // 주문자명(string)
      buyer_tel: "010-7628-6007", // 주문자 연락처(string)
      buyer_email: "test@naver.com", // 주문자 이메일(string)
      buyer_addr: "서울특별시", // 주문자 주소(string)
      buyer_postcode: "123-456", // 주문자 우편번호(string)
    },
    async (rsp) => {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/verifyIamport/" + rsp.imp_uid
        );
        if (rsp.paid_amount === data.response.amount) {
          // 결제 금액의 위변조 검증
          alert("결제 성공");
        } else {
          alert("결제 실패1");
        }
      } catch (error) {
        console.error("Error white verifying payment : ", error);
        alert("결제 실패2");
      }
    }
  );
};

export default requestPay;
