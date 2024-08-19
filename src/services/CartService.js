import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/cart';

export const listCarts = (memberId) =>
  axios.get(REST_API_BASE_URL + '/' + memberId);

export const createcart = (cart) => axios.post(REST_API_BASE_URL, cart);

export const updateGoods = (cartId, cart) =>
  axios.put(REST_API_BASE_URL + '/' + cartId, cart);

export const deleteGoods = (cartId) =>
  axios.delete(REST_API_BASE_URL + '/' + cartId);
