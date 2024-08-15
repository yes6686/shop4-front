import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {addCount} from './../store/cartSlice'
import './../App.css'

const Cart = () => {

    let state = useSelector((state)=> { return state})
    let dispatch = useDispatch()
    const [number, setNumber] = useState(0); // 초기 숫자값을 0으로 설정

    const increaseNumber = () => {
        setNumber(prevNumber => prevNumber + 1); // 숫자 증가
    };

    const decreaseNumber = () => {
        setNumber(prevNumber => (prevNumber > 0 ? prevNumber - 1 : 0)); // 숫자 감소, 0보다 작아지지 않도록
    };
 
    
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
                <tr key={i}>
                <td>{state.cart[i].id}</td>
                <td><img className="image" src={`${state.cart[i].url}`}></img></td>
                <td>{state.cart[i].name}</td>
                <td>
                <div >
                    <div onClick={increaseNumber}>&#8593;</div> {/* 위쪽 화살표 */}
                    <div>{number}</div>
                    <div onClick={decreaseNumber}>&#8595;</div> {/* 아래쪽 화살표 */}
                </div>
                </td>
                <td>{state.cart[i].price}</td>
                <td>무료</td>
                <td>{state.cart[i].stock}</td>
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