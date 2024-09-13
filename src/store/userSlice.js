import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
	name: 'user',
	initialState: 'Guest',
	reducers: {
		// Redux의 state 변경하는 함수 만드는 곳
	},
});

export default user;
