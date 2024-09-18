import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/payments";

export const listPayments = () => axios.get(REST_API_BASE_URL);

export const createPayment = (payment) =>
  axios.post(REST_API_BASE_URL, payment);

export const getPayment = (paymentId) =>
  axios.get(`${REST_API_BASE_URL}/${paymentId}`);

export const updatePayment = (paymentId, payment) =>
  axios.patch(`${REST_API_BASE_URL}/${paymentId}`, payment);

export const deletePayment = (paymentId) =>
  axios.delete(`${REST_API_BASE_URL}/${paymentId}`);

export const getPaymentsByMemberId = (memberId) =>
  axios.get(`${REST_API_BASE_URL}/member/${memberId}`);
