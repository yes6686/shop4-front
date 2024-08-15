import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap'
import { useDispatch } from "react-redux";
import {addItem} from './../store/cartSlice';


function Detail(props){

    let {id} = useParams();
    let findProduct = props.shoes.find(x=> x.id == id);
    let [alert, setAlert] = useState(true)
    let [tab, setTab] = useState(0)
    let dispatch = useDispatch()
    const [message, setMessage] = useState('');

    const handleOrderClick = () => {
        dispatch(addItem(findProduct));
        setMessage('상품이 장바구니에 추가되었습니다!'); // 메시지 설정
        setTimeout(() => setMessage(''), 3000); // 3초 후 메시지 제거
    };

    useEffect(()=>{
        let watched = localStorage.getItem('watched')
        watched = JSON.parse(watched)
        watched.push(findProduct.id)
        watched = new Set(watched)
        watched = Array.from(watched)
        localStorage.setItem('watched',JSON.stringify(watched))
    },[])

    useEffect(()=>{
        let timer = setTimeout(()=>{setAlert(false)},10000)
        console.log(1)
        return ()=>{
            // useEffect가 실행되기 전에 실행됨 (단, mount (X), unmount (O))
            console.log(2)
            clearTimeout(timer) // 타이머 제거해주는 함수
        }
    }, [])


    let [fade, setFade] = useState('')

    useEffect(()=>{
        setFade('end')
        return ()=>{
            setFade('')
        }
    },[])


    return (
        <>        
        {
            alert == true ? <div className="alert alert-warning">
            10초이내 구매시 할인
            </div> : null
        }
        <div className={'container start '+fade}>
            
        <div className="row">
            <div className="col-md-6">
            <img src={`${findProduct.url}`} width="100%" />
            </div>
            <div className="col-md-6 product">
            <h4 className="pt-5 product-title">name : {findProduct.name}</h4>
            <p className="product-content">description : {findProduct.description}</p>
            <p className="product-price">price : {findProduct.price}</p>
            <p className="product-count">stock : {findProduct.stock}</p>
            <button className="btn btn-danger order-button" 
            onClick={handleOrderClick}>order</button> 
            </div>
            {/* 메시지 표시 */}
            {message && <div className="alert alert-success">{message}</div>} 
        </div>
        <Nav variant ="tabs" defaultActiveKey="link0">
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
            <TabContent tab={tab} shoes={props.shoes}/>

        </div> 
        </>

      )
}

function TabContent({tab,shoes}){

    let [fade, setFade] = useState('') 


    useEffect(()=>{ // automatic batching 기능 방지를 위한 setTimeout() 사용
        let timer = setTimeout(()=>{setFade('end')},100)
        return ()=>{
            clearTimeout(timer)
            setFade('')
        }
    }, [tab])


    return <div className={'start '+fade}>
        {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tab]}
    </div>
}


export default Detail;