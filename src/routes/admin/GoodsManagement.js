import { useEffect, useState } from "react";
import { listGoods } from "../../services/GoodsService";

function GoodsManagement() {
  let [goods, setGoods] = useState([]);

  useEffect(() => {
    listGoods().then((response) => {
      setGoods(response.data);
    });

    console.log(goods);
  }, []);

  return (
    <div
      style={{
        display: "inline-grid",
        border: "1px solid green",
      }}
    >
      <h2>상품관리컴포넌트임</h2>
      <table>
        {goods.map((item) => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.price}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default GoodsManagement;
