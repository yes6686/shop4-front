import React, { useEffect } from 'react'
import {useState } from 'react';
import './../App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Home = (props) => {

  return (
    <div className="App">
    <div className='main-bg'></div>
    <div className='container'>
      <div className='row'>
        {
          props.shoes.map((a, index)=>{
            return (
              <Card shoes={props.shoes} index={index}></Card>
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