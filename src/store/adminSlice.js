import { configureStore, createSlice } from '@reduxjs/toolkit';

let isAdmin = createSlice({
	name: 'isAdmin',
	initialState: false,
	reducers: {
		setIsNotAdmin() {
			return false;
		},
		setIsAdmin() {
			return true;
		},
	},
});

export let { setIsNotAdmin, setIsAdmin } = isAdmin.actions;

export default isAdmin;
