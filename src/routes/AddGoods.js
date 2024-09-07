import { useState } from 'react';
import './css/AddGoods.css';
import './css/Detail.css';
import './css/Direct.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';

function AddGoods() {
	const imageUrl = process.env.PUBLIC_URL;

	let [name, setName] = useState('');
	let [price, setPrice] = useState('');
	let [description, setDescription] = useState('');
	let [stock, setStock] = useState('');
	let [url, setUrl] = useState('');
	let [category, setCategory] = useState('');

	const [files, setFiles] = useState([]);

	const handleFilesChange = (e) => {
		setFiles(Array.from(e.target.files));
	};

	const uploadFiles = (e) => {
		if (!files) {
			return;
		}
		e.preventDefault();
		const formData = new FormData();

		files.map((file) => {
			formData.append('files', file);
		});

		console.log(Array.from(formData));

		axios
			.post(imageUrl, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		console.log(files);
	}, [files]);

	let [toast, setToast] = useState(false);

	let navigate = useNavigate();

	function validateAndSubmit() {
		if (
			name == '' ||
			price == '' ||
			stock == '' ||
			description == '' ||
			category == ''
		) {
			setToast(true);
		} else {
			if (description.length <= 10) {
				console.log('설명이짧아용');
			} else {
				let newItem = {
					name: name,
					price: price,
					stock: stock,
					description: description,
					category: category,
					url: url,
				};
			}
		}
	}

	return (
		<div className="AddBody" style={{ width: '40%', margin: '0 auto' }}>
			<h2 style={{ textAlign: 'center' }}>상품추가페이지임</h2>
			<table className="direct-table">
				<tbody>
					<tr>
						<td>상품명</td>
						<td>
							<input
								className="form-control"
								onChange={(e) => {
									setName(e.target.value);
								}}
							></input>
						</td>
					</tr>
					<tr>
						<td>가격 </td>
						<td>
							<input
								className="form-control"
								onChange={(e) => {
									setPrice(e.target.value);
								}}
							></input>
						</td>
					</tr>
					<tr>
						<td>상품 설명</td>
						<td>
							<input
								className="form-control"
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							></input>
						</td>
					</tr>
					<tr>
						<td>재고수 </td>
						<td>
							<input
								className="form-control"
								onChange={(e) => {
									setStock(e.target.value);
								}}
							></input>
						</td>
					</tr>
					<tr>
						<td>상품 이미지</td>
						<td>
							{' '}
							<input
								type="file"
								className="form-control"
								style={{ width: '80%', margin: '0 auto' }}
								onChange={(e) => {
									handleFilesChange(e);
									if (e.target.files[0].name) {
										setUrl(`${imageUrl}/${e.target.files[0].name}`);
										console.log(url);
									} else {
									}
								}}
							></input>
						</td>
					</tr>
					<tr>
						<td>카테고리</td>
						<td>
							<select
								onChange={(e) => {
									console.log(e.target.value);
									setCategory(e.target.value);
								}}
							>
								<option selected>신발</option>
								<option>상의</option>
								<option>하의</option>
								<option>모자</option>
							</select>
						</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
			<div
				style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}
			>
				<button
					className="buy-button"
					style={{}}
					onClick={(e) => {
						uploadFiles(e);
						validateAndSubmit();
					}}
				>
					등록하다
				</button>
				<button
					className="cancel-button"
					onClick={() => {
						navigate('/');
					}}
				>
					돌아가다
				</button>
			</div>

			<ToastContainer position="top-end" style={{ margin: 'auto' }}>
				<Toast
					className="d-inline-block m-1"
					bg="danger"
					onClose={() => setToast(false)}
					show={toast}
					delay={3000}
					autohide
				>
					<Toast.Header>
						<strong className="me-auto">Warning</strong>
					</Toast.Header>
					<Toast.Body className={'text-white'}>Form is Empty.</Toast.Body>
				</Toast>
			</ToastContainer>

			<img alt="/logo192.png" src=""></img>
		</div>
	);
}

export default AddGoods;
