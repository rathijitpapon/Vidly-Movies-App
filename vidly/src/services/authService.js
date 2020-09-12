import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
// const tokenKey = "token";

http.setJWT(getJWT());

export async function login(email, password) {
    const tokenKey = "token";
    const { data: jwt } = await http.post(apiEndpoint, {
        email,
        password
    });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
    const tokenKey = "token";
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    const tokenKey = "token";
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    const tokenKey = "token";
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (e) {
        return null;
    }
}

export function getJWT() {
    const tokenKey = "token";
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    loginWithJWT,
    getCurrentUser,
    getJWT
};