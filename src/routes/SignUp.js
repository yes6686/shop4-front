import './css/SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMember } from '../services/MemberService';
import axios from 'axios';

function SignUp() {
	const navigate = useNavigate();

	// json형태로 변수 선언 후에 값 입력받기
	const [formData, setFormData] = useState({
		userId: '',
		userPw: '',
		name: '',
		phone: '',
		email: '',
		address: '',
		age: '',
		birth: '',
		gender: '',
	});

	const [isIdUnique, setIsIdUnique] = useState(false);

	// input으로 입력받는 값들 저장
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	// 빈칸있는지 확인
	const validateForm = () => {
		return Object.values(formData).every((value) => value.trim() !== '');
	};

	// 회원가입
	const onSubmit = async (e) => {
		e.preventDefault();

		// 빈칸 확인
		if (!validateForm()) {
			alert('모든 필드를 채워주세요.');
			return;
		}
		if (!isIdUnique) {
			alert('중복확인 해주세요');
			return;
		}

		// 회원가입 서버에 요청
		try {
			const data = { ...formData, cash: 0 };
			console.log(data);
			await createMember(data);
			alert('회원가입이 완료되었습니다.');
		} catch (error) {
			alert('회원가입에 실패하였습니다.');
			console.error(error);
		}
	};

	//아이디 중복확인
	const checkDuplicate = async () => {
		try {
			const res = await axios.get(
				`http://localhost:8080/api/members/check/${formData.userId}`
			);
			if (res.data) {
				alert('중복된 아이디입니다. 다른 아이디를 사용해주세요.');
				setIsIdUnique(false);
			} else {
				alert('사용 가능한 아이디입니다.');
				setIsIdUnique(true);
			}
		} catch (error) {
			console.error('아이디 중복 확인에 실패했습니다.', error);
			alert('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
		}
	};

	return (
		<>
			<form className="signUpForm" onSubmit={onSubmit}>
				<h2 className="title">회원가입</h2>

				{/* 아이디 입력 및 중복확인 태그 */}
				<div className="mb-3 d-flex align-items-center">
					<input
						type="text"
						name="userId"
						value={formData.userId}
						onChange={handleChange}
						className="form-control"
						placeholder="아이디"
					/>
					<button
						type="button"
						className="btn btn-primary ms-2 btn-sm"
						style={{
							width: '100px',
							height: '100%',
							padding: '5px 10px',
							fontSize: '0.875rem',
						}}
						onClick={checkDuplicate}
					>
						중복 확인
					</button>
				</div>

				{/* mpa을 활용해 각 입력 필드 */}
				{Object.entries({
					userPw: '비밀번호',
					name: '이름',
					phone: '휴대폰 번호',
					email: '이메일',
					address: '주소',
					age: '나이',
					birth: '생일',
					gender: '성별',
				}).map(([key, placeholder]) => (
					<div className="mb-3" key={key}>
						<input
							type={
								key === 'email' ? 'email' : key === 'birth' ? 'date' : 'text'
							}
							name={key}
							value={formData[key]}
							onChange={handleChange}
							className="form-control"
							placeholder={placeholder}
						/>
					</div>
				))}

				<button type="submit" className="btn btn-primary">
					회원가입
				</button>
			</form>
		</>
	);
}

export default SignUp;
