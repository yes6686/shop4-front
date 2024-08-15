import React from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {addCount} from './../store/cartSlice'

const Cart = () => {

    let state = useSelector((state)=> { return state})
    let dispatch = useDispatch()
    
    return (
        <div>
            
        <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
            {
            state.cart.map((a,i)=>
                <>
                <tr key={i}>
                <td>{state.cart[i].id}</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].price}</td>
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