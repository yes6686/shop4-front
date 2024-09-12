import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/members';

//친구 목록 조회
export const listFriends = (myId) =>
  axios.get(REST_API_BASE_URL + '/friendsList/' + myId);

//친구 요청
export const requestFriend = (myId, friendId) =>
  axios.get(REST_API_BASE_URL + '/addFriend/' + myId + '/' + friendId);

//친구 요청 목록 조회
export const requestedListFriends = (myId) =>
  axios.get(REST_API_BASE_URL + '/RequestedFriendList/' + myId);

//친구 거절
export const rejectFriend = (myId, friendId) =>
  axios.get(REST_API_BASE_URL + '/rejectFriend/' + myId + '/' + friendId);

//친구 요청 수락
export const acceptFriend = (myId, friendId) =>
  axios.get(REST_API_BASE_URL + '/acceptFriend/' + myId + '/' + friendId);

//친구 삭제
export const deleteFriend = (myId, friendId) =>
  axios.delete(REST_API_BASE_URL + '/deleteFriend/' + myId + '/' + friendId);
