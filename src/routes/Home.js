import React, { useEffect } from 'react'
import {useState } from 'react';
import './../App.css';
import { NavLink } from 'react-router-dom';
import { listGoods } from '../services/GoodsService';
import { useSelector } from 'react-redux';

const Home = () => {

  let [shoes, setShoes] = useState([])
  useEffect(()=>{
    getAllGoods();
  },[])

  function getAllGoods(){
    listGoods().then((response)=>{
        setShoes(response.data);
    }).catch(error=>{
        console.error(error);
    })
  }

  const state = useSelector((state) => state);
  let filterTitle = shoes.filter((p) => {
    return p.name.replace(" ","").toLocaleLowerCase().includes(state.search.toLocaleLowerCase().replace(" ",""))
  })

  useEffect(()=>{
    filterTitle = shoes.filter((p) => {
      return p.name.replace(" ","").toLocaleLowerCase().includes(state.search.toLocaleLowerCase().replace(" ",""))
  });
  },[state.search])
  

  return (
    <div className="App">
    <div className='main-bg'></div>
    <div className='container'>
      <div className='row'>
        {
          filterTitle.map((a, index)=>{
            return (
              <Card key={index} shoes={filterTitle} index={index}></Card>
            )
          })
        }
      </div>
    </div>
  </div>
  )
}
function Card(props){
    return (
      <div className='col-md-4'>
              <NavLink to={"/detail/"+(props.index+1)}>
                <img src={`${props.shoes[props.index].url}`} width='80%'/>
                </NavLink>
                <h4>{props.shoes[props.index].name}</h4>
                <p>{props.shoes[props.index].description}</p>
                <p>{props.shoes[props.index].price}</p>
                </div>
    )
  }
  
export default Home