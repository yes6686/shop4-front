import { updateGoods } from "../../services/GoodsService";
import { updateMember } from "../../services/MemberService";
import { deleteCart } from "../../services/CartService";
function Section3({ copyUser, totalPrice, cartData }) {
  return (
    <>
      <div className="section3">
        {/*결제정보 테이블*/}
        <h2>결제 정보</h2>
        <table
          className="direct-table"
          style={{ margin: "0 auto", width: "100%" }}
        >
          <tbody>
            <tr>
              <td>총액</td>
              <td>{totalPrice}</td>
            </tr>
            <tr>
              <td>총결제액</td>
              <td>{totalPrice}</td>
            </tr>
            <tr>
              <td>결제방식</td>
              <td>통합결제?</td>
            </tr>
          </tbody>
        </table>

        <div style={{ margin: "0 auto" }}>
          <button
            className="buy-button"
            style={{ textAlign: "center", margin: "5px" }}
            onClick={async () => {
              //잔액 많으면 돈 까고 재고도 깜
              if (copyUser.cash >= totalPrice) {
                await updateMember(copyUser.id, {
                  cash: copyUser.cash - totalPrice,
                });

                cartData.map(async (item) => {
                  await updateGoods(item.goods.id, {
                    stock: item.goods.stock - item.quantity,
                  });
                  await deleteCart(item.id);
                });

                navigator("/");
              } else {
                console.log("잔액이 부족합니다.");
              }
              //그리고 홈으로 이동
            }}
          >
            구매하다
          </button>
          {/*cancel-button : direct.css에있음*/}
          <button
            className="cancel-button"
            style={{ textAlign: "center", margin: "5px" }}
            onClick={() => {
              navigator(-1); // 이전 페이지로 이동
            }}
          >
            취소하다
          </button>
        </div>
      </div>
    </>
  );
}

export default Section3;
