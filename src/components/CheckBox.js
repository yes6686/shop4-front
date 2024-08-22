import React, { useState } from 'react';

const CheckBox = (props) => {
	const { id, checkGoodsHandler } = props;
	const [checked, setChecked] = useState(false);

	const checkHandled = ({ target }) => {
		setChecked(!checked);
		checkGoodsHandler(target.id, target.checked);
	};

	return (
		<label>
			<input
				id={id}
				type="checkbox"
				style={{ width: '30px', height: '30px' }}
				checked={checked}
				onChange={(e) => checkHandled(e)}
			/>
		</label>
	);
};

export default CheckBox;
