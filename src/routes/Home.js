import React, { useEffect } from 'react';
import { useState } from 'react';
import './../App.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { listGoods } from '../services/GoodsService';
import { useSelector } from 'react-redux';
import HomeSlider from '../components/HomeSlider';

const Home = () => {
	let navigate = useNavigate();
	let isAdmin = useSelector((state) => state.isAdmin);
	console.log(isAdmin);

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
			.replace(' ', '')
			.toLocaleLowerCase()
			.includes(state.search.toLocaleLowerCase().replace(' ', ''));
	});

	useEffect(() => {
		filterTitle = shoes.filter((p) => {
			return p.name
				.replace(' ', '')
				.toLocaleLowerCase()
				.includes(state.search.toLocaleLowerCase().replace(' ', ''));
		});
	}, [state.search]);

	return (
		<div className="App">
			<HomeSlider className=""></HomeSlider>
			<br />
			<br />
			<br />
			<br />
			<div className="container">
				<div className="row">
					{filterTitle.map((a, index) => {
						return <Card key={index} shoes={filterTitle} index={index}></Card>;
					})}
				</div>
			</div>

			{/*관리자일때만 뜸*/}
			{isAdmin == true ? (
				<>
					<hr />{' '}
					<div>
						<h2>관리자임</h2>
						<button
							className="btn btn-primary"
							style={{ width: '5%', margin: '5px' }}
							onClick={() => {
								navigate('/addgoods');
							}}
						>
							상품추가
						</button>
						<button
							className="btn btn-danger"
							style={{ width: '5%' }}
							onClick={() => {
								navigate('/userManagement');
							}}
						>
							유저 관리
						</button>
					</div>
				</>
			) : (
				console.log('암것도안함')
			)}
		</div>
	);
};

function Card(props) {
	return (
		<div className="col-md-4">
			<NavLink to={'/detail/' + (props.index + 1)}>
				<img src={`${props.shoes[props.index].url}`} width="80%" />
			</NavLink>
			<h4>{props.shoes[props.index].name}</h4>
			<p>{props.shoes[props.index].description}</p>
			<p>{props.shoes[props.index].price}</p>
		</div>
	);
}

export default Home;
