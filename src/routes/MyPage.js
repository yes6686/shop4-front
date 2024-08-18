import React, { useEffect } from 'react'
import { createMember, getMember } from '../services/MemberService';
import { useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import axios from 'axios';

const MyPage = () => {  
  let [user, setUser] = useState([]);
  let member = {
    name : 'babo',
    email : 'a@gmail.com',
    address : '서울',
    phone : '01012345678',
    age : '25',
    birth : '2000-12-17',
    gender: '남',
    userId : 'ujkid',
    userPw : 'ujkpw'
  }

  useEffect(() => {
    getMember(1).catch(function (error) {
      if (error.response) {
        createMember(member)
      }
    }).finally(function() { 
      getMember(1).then((response)=> {
        setUser(response.data)
      })
    })
  },[])
  

return (
    <>
        <div style={{border : '3px solid blue',  height : 'auto', display : "flex"}}>
            <div style={{width : '30%', border : '1px solid red', margin : '60px', float : "left", boxSizing : "border-box"}}>
                <Image src="doraemon.jpg" rounded></Image>
                <div style={{textAlign: 'center'}}>{user.name}</div>
            </div>

            <div style={{border : '1px solid red', width : '50%', margin : '60px', float : "right"}}>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.name}</div>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.email} </div>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.address}</div>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.phone}</div>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.age}</div>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.birth}</div>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.gender}</div>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.userid}</div>
                <div style={{height : 'auto', border : '1px solid green', margin : '15px'}}>{user.userpw}</div>
            </div>
        </div>
    </>
)}

export default MyPage