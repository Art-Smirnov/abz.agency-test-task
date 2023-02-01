import axios from "axios";
import {URL} from "../constants";

const instance = axios.create({
  baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1/",
});

export const usersApi = {
  getUsers(page) {
  return instance.get(`users?page=${page}&count=6`);
  },

  getPositions() {
    return instance.get('positions');
  },

  addNewUser(values) {
    const formData = new FormData();
    formData.append('position_id', values.position);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('photo', values.photo);

    return instance.get('token').then(tokenResponse => {
     return instance.post('users', formData, {
        headers: {
          'Token': tokenResponse.data.token,
        }
      })
    })
  }
}