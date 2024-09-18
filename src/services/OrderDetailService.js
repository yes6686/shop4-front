import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/order-details';

export const listOrderDetails = () => axios.get(REST_API_BASE_URL);

export const createOrderDetail = (orderDetail) =>
	axios.post(REST_API_BASE_URL, orderDetail);

export const getOrderDetail = (orderDetailId) =>
	axios.get(`${REST_API_BASE_URL}/${orderDetailId}`);

export const updateOrderDetail = (orderDetailId, orderDetail) =>
	axios.patch(`${REST_API_BASE_URL}/${orderDetailId}`, orderDetail);

export const deleteOrderDetail = (orderDetailId) =>
	axios.delete(`${REST_API_BASE_URL}/${orderDetailId}`);

export const getOrderDetailsByOrderId = (orderId) =>
	axios.get(`${REST_API_BASE_URL}/order/${orderId}`);

export const deleteOrderDetailsByOrderId = (orderId) =>
	axios.delete(`${REST_API_BASE_URL}/order/${orderId}`);

export const getOrderDetailsByMemberId = (memberId) =>
	axios.get(`${REST_API_BASE_URL}/member/${memberId}`);
