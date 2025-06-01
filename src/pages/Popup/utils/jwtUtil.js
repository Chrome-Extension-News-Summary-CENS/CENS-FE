import axios from "axios";
import { getStorage, setStorage } from './storageUtil';

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const host = "http://api.cens.kro.kr:8080"; // API 서버 호스트
  // const host = "http://localhost:8080"; // 로컬 테스트용
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const res = await axios.get(`${host}/api/token/refresh?refreshToken=${refreshToken}`, header);

  console.log("-------------------");
  console.log(res.data);

  return res.data;
};

// ✅ before request
const beforeReq = async (config) => {
  console.log("----------before request----------");

  const accessToken = await getStorage('accessToken');

  if (!accessToken) {
    console.log("Access Token NOT FOUND");
    return Promise.reject({
      response: {
        data: { error: "REQUIRE_LOGIN" },
      },
    });
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

// fail request
const requestFail = (error) => {
  console.log("----------request fail----------");
  return Promise.reject(error);
};

// ✅ before return response
const beforeRes = async (response) => {
  console.log("----------before return response----------");
  const data = response.data;

  if (data && data.error === "INVALID_ACCESS_TOKEN") {
    const accessToken = await getStorage('accessToken');
    const refreshToken = await getStorage('refreshToken');

    const result = await refreshJWT(accessToken, refreshToken);
    console.log("refreshJWT RESULT", result);

    await setStorage('accessToken', result.accessToken);
    await setStorage('refreshToken', result.refreshToken);

    const originalRequest = response.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    return await axios(originalRequest);
  }

  return response;
};

// fail response
const responseFail = (error) => {
  console.log("----------response fail----------");
  return Promise.reject(error);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
