import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/orders";

export const listOrders = () => axios.get(REST_API_BASE_URL);

export const createOrder = (order) => axios.post(REST_API_BASE_URL, order);

export const getOrder = (orderId) =>
  axios.get(`${REST_API_BASE_URL}/${orderId}`);

export const updateOrder = (orderId, order) =>
  axios.patch(`${REST_API_BASE_URL}/${orderId}`, order);

export const deleteOrder = (orderId) =>
  axios.delete(`${REST_API_BASE_URL}/${orderId}`);

export const getOrdersByMemberId = (memberId) =>
  axios.get(`${REST_API_BASE_URL}/member/${memberId}`);
