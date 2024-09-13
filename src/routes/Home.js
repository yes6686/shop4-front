import React, { useEffect } from "react";
import { useState } from "react";
import "./../App.css";
import "./css/Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { listGoods } from "../services/GoodsService";
import { useSelector } from "react-redux";
import HomeSlider from "../components/HomeSlider";

const Home = () => {
  let navigate = useNavigate();
  let isAdmin = useSelector((state) => state.isAdmin);

  let [shoes, setShoes] = useState([]);
  useEffect(() => {
    getAllGoods();
  }, []);

  function getAllGoods() {
    listGoods()
      .then((response) => {
        setShoes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const state = useSelector((state) => state);
  let filterTitle = shoes.filter((p) => {
    return p.name
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(state.search.toLocaleLowerCase().replace(" ", ""));
  });

  useEffect(() => {
    filterTitle = shoes.filter((p) => {
      return p.name
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(state.search.toLocaleLowerCase().replace(" ", ""));
    });
  }, [state.search, shoes]);

  return (
    <div className="App">
      <HomeSlider className=""></HomeSlider>
      <div className="container shoe-container">
        <div className="row shoe-row">
          {filterTitle.map((a, index) => {
            return (
              <div className="col-md-4 shoe-card" key={index}>
                <figure className="snip1200">
                  <img src={a.url} alt={a.name} className="shoe-image" />
                  <figcaption>
                    <div className="heading">
                      <h2>{a.name}</h2>
                    </div>
                    <p>{a.description}</p>
                    <p className="price">{a.price} 원</p>
                  </figcaption>
                  <NavLink to={`/detail/${index + 1}`}></NavLink>
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      {/* 관리자일 때만 표시 */}
      {isAdmin && (
        <>
          <hr />
          <div>
            <h2>관리자임</h2>
            <button
              className="btn btn-primary"
              style={{ width: "10%", margin: "5px" }}
              onClick={() => {
                navigate("/addgoods");
              }}
            >
              상품 추가
            </button>
            <button
              className="btn btn-danger"
              style={{ width: "10%" }}
              onClick={() => {
                navigate("/userManagement");
              }}
            >
              유저 관리
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
