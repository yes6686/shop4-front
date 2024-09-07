import './css/MyPage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import defaultImage from '../images/bg.jpg';


const MyPage = () => {
	const user = JSON.parse(sessionStorage.getItem('user')); // 세션에서 사용자 이름 가져오기
	const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // 로그인 여부 확인
	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [email, setEmail] = useState('guest@gmail.com');

	// 유저 이미지 관리 변수 및 함수
	const [image, setImage] = useState(defaultImage);
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file); // 이미지 파일을 base64 URL로 변환
		}
	};

	const handleSaveEmail = () => {
		// 이메일 저장 로직 추가
		setIsEditingEmail(false);
	};

	let navigate = useNavigate();
	useEffect(() => {
		if (!isLoggedIn || !user) {
			alert('로그인을 하셔야합니다.');
			navigate('/login'); // 로그인되지 않았거나 사용자 정보가 없는 경우 로그인 페이지로 이동
			return;
		}
	}, [isLoggedIn, user, navigate]);

	// user 객체가 null일 경우를 대비한 체크
	if (!user) {
		return null; // user가 null일 경우 컴포넌트를 렌더링하지 않음
	}

	return (
		<>
			<h2 className="myPageTitle">마이페이지</h2>
			<br />
			<hr />

			<div className="table-wrapper">
				<table className="table myPageTable">
					<tbody>
						{[
							{ label: '아이디', value: user.userId },
							{ label: '이름', value: user.name },
							{ label: '연락처', value: user.phone },
							{ label: '주소', value: user.address },
							{ label: '이메일', value: user.email },
							{ label: '잔액', value: user.cash + '원' },
						].map((item, index) => (
							<tr
								key={index}
								style={index === 0 ? { borderTop: '2px solid #000' } : {}}
							>
								<th scope="row">{item.label}</th>
								<td>{item.value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/*<div style={{border : '3px solid blue',  height : 'auto', display : "flex"}}>
                <div style={{width : '30%', border : '1px solid red', margin : '60px', float : "left", boxSizing : "border-box"}}>
                    <Image src="doraemon.jpg" rounded></Image>
                    <div style={{textAlign: 'center'}}>{user.name}</div>
    return (
        <>
        <div className="myPageContainer">
            {/* 왼쪽 부분 */}
			<div className="leftContent">
				<h4 style={{ fontWeight: 'bold', marginLeft: '30px' }}>마이페이지</h4>{' '}
				<br />
				<ul style={{ listStyleType: 'none' }}>
					<h5
						className="headLine"
						style={{ fontWeight: 'bold', marginBottom: '15px' }}
					>
						내 정보
					</h5>
					<li>
						<Link to="/myPage">프로필 정보</Link>
					</li>
					<li>주소록</li>
					<li>결제 정보</li>
				</ul>
				<br />
				<ul style={{ listStyleType: 'none' }}>
					<h5 style={{ fontWeight: 'bold', marginBottom: '15px' }}>
						쇼핑 정보
					</h5>
					<li>구매 내역</li>
					<li>관심 상품</li>
				</ul>
			</div>

			{/* 오른쪽 부분 */}
			<div className="rightContent">
				<h4 style={{ marginTop: '20px', fontWeight: 'bold' }}>프로필 정보</h4>
				<hr
					style={{
						border: 'none',
						width: '80%',
						height: '5px',
						backgroundColor: 'black',
					}}
				/>

				{/* 이미지랑 이름 */}
				<div className="myPageSection1">
					{/* 이미지 부분 */}
					<div style={{ padding: '15px' }}>
						<button
							className="btn"
							style={{ cursor: 'pointer', border: 'none' }}
						>
							<img
								src={image}
								alt="Description"
								style={{ width: '100px', height: '100px', borderRadius: '50%' }}
							/>
						</button>
					</div>

					{/* 이름 부분 */}
					<div>
						<span
							style={{
								fontWeight: 'bold',
								fontSize: '26px',
								display: 'inline-block',
								marginBottom: '10px',
							}}
						>
							{user.name} 님
						</span>
						<br />
						<input
							type="file"
							accept="image/*"
							style={{ display: 'none' }}
							id="imageUpload"
							onChange={handleImageChange}
						/>
						<label
							htmlFor="imageUpload"
							className="btn"
							style={{ fontSize: '12px', cursor: 'pointer' }}
						>
							이미지 변경
						</label>
						<button
							className="btn"
							style={{ fontSize: '12px', marginLeft: '15px' }}
							onClick={() => {
								console.log(image);
							}}
						>
							{' '}
							삭제
						</button>
					</div>
				</div>

				<hr style={{ width: '80%' }} />
				<br />

				{/* 로그인 정보 칸 */}
				<div className="myPageSection2">
					<h5 style={{ fontWeight: 'bold' }}>로그인 정보</h5>

					<div className="list">
						<div>
							<label>이메일 주소</label>
							<br />

							{isEditingEmail ? (
								<input
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									onBlur={() => setIsEditingEmail(false)}
									autoFocus
								/>
							) : (
								<span>{user.email}</span>
							)}
						</div>

						<button
							className="btn"
							type="button"
							onClick={() => {
								if (isEditingEmail) {
									handleSaveEmail();
								} else {
									setIsEditingEmail(true);
								}
							}}
						>
							{isEditingEmail ? '저장' : '변경'}
						</button>
					</div>

					<div className="list">
						<div>
							<label>비밀번호</label>
							<br />
							<span>●●●●●●●</span>
						</div>
						<button className="btn" type="button">
							변경
						</button>
					</div>
				</div>

				{/* 개인 정보 칸 */}
				<div className="myPageSection3">
					<h5 style={{ fontWeight: 'bold' }}>개인 정보</h5>
					<div className="list">
						<div>
							<label>이름</label> <br />
							<span>{user.name}</span>
						</div>
						<div>
							<button className="btn" type="button">
								변경
							</button>
						</div>
					</div>
					<div className="list">
						<div>
							<label>휴대폰 번호</label>
							<br />
							<span>{user.phone}</span>
						</div>
						<button className="btn" type="button">
							변경
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyPage;
