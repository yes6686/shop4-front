import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
	name: 'user',
	initialState: 'Guest',
	reducers: {
		// redux의 state 변경하는 함수 만드는 곳
	},
});

export default user;
