import { useEffect, useState } from 'react';
import { getGoodsByCategory } from '../services/GoodsService';
import { useParams } from 'react-router-dom';

function GoodsByCategory() {
	let [goods, setGoods] = useState([]);
	const { category } = useParams();

	useEffect(() => {
		const getCategory = async () => {
			if (category) {
				const response = await getGoodsByCategory(category);
				setGoods(response.data);
			}
		};

		getCategory();
		console.log(goods);
	}, [category]);

	return (
		<div style={{ width: '50%', height: '50%' }}>
			{goods.length > 0 ? (
				goods.map((item) => <h2 key={item.id}>{item.name}</h2>)
			) : (
				<p>No goods found</p>
			)}
		</div>
	);
}

export default GoodsByCategory;
