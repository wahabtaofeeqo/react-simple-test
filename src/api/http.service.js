import axios from 'axios';
import buffer from 'buffer';

/**
 * Mock User
 * 
 */
let password = "13023";
let username = "3442f8959a84dea7ee197c632cb2df15";
let AUTH_TOKEN = 'Basic ' + buffer.Buffer.from(username + ':' + password).toString('base64');

/**
 * Instance
 */
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/'
});
axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


export function get(url) {
    return axiosInstance.get(url);
}

export function put(url, data) {
    return axiosInstance.put(url, data);
}

export function del(url) {
    return axiosInstance.delete(url);
}

export function post(url, data) {
    return axiosInstance.post(url, data);
}