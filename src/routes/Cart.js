import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {addCount} from './../store/cartSlice'
import './../App.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    let state = useSelector((state)=> { return state})
    let dispatch = useDispatch()
    let navigate = useNavigate()
 
    
    return (
        <div>
        <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>이미지</th>
            <th>상품정보</th>
            <th>수량</th>
            <th>상품구매금액</th>
            <th>배송비</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
            {
            state.cart.map((a,i)=>
                <>
                <tr key={i} style={{ textAlign: 'center', fontSize : '22px'}}>
                <td>{state.cart[i].id}</td>
                <td onClick={()=>{ // 이미지 클릭 시 이미지 상품으로 경로 이동
                        navigate(`/detail/${state.cart[i].id}`)
                    }}><img className="image" src={`${state.cart[i].url}`}></img></td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].stock}</td>
                <td>{state.cart[i].price}</td>
                <td>무료</td>
                <td>0</td>
                <td>
                    <button onClick={()=>{
                        dispatch(addCount(state.cart[i].id))
                    }}>+</button>
                </td>
                </tr>
                </>
            
            )
            }
        </tbody>
      </Table>
      </div>
    )
}



export default Cart