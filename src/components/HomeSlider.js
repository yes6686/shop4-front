//$ npm install react-slick --save // 라이브러리 설치
//$ npm install slick-carousel --save // css 설치

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import { useState } from 'react';
import { Image } from 'react-bootstrap';

//called slick, slider, carousel

function HomeSlider() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
	};

	const imageURL = `${process.env.PUBLIC_URL}/images/`;

	const imageList = [`${imageURL}/신발.jpg`, `${imageURL}/바지.jpg`];
	return (
		<div
			style={{
				width: '80%',
				height: '700px',
				margin: '0 auto',
				overflow: 'hidden',
			}}
		>
			<Slider {...settings}>
				{imageList.map((item) => {
					return (
						<img
							src={item}
							style={{
								width: '100%',
								objectFit: 'cover',
							}}
						></img>
					);
				})}
			</Slider>
		</div>
	);
}

export default HomeSlider;
