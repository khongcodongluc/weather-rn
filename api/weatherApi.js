import { sendGet } from "./axios";
import { sendGetAir } from "./axiosAir";

const getWeatherByName = async (name = "Hanoi") => {
    try {
      // const res = await sendGet(`/weather?q=${name}&units=metric&appid=1194cb71b2922d22d0acc81dccb15346`);
      const res = await sendGet(`/forecast.json?key=1e648b8ae2c444068a182111221202&q=${name}&days=5`);
      return res;
    } catch (error) {
      return error;
    }
};

const searchCity = async (name = "") => {
  try {
    const res = await sendGet(`/search.json?key=1e648b8ae2c444068a182111221202&q=${name}`);
    return res;
  } catch (error) {
    return error;
  }
};

const getAirQuality = async (lat = "21.03", lon = "105.85") => {
  try {
    const res = await sendGetAir(`/nearest_city?key=dfbd5d7a-11eb-42ab-beb2-9ede6e8e50e2&lat=${lat}&lon=${lon}`);
    return res;
  } catch (error) {
    return error;
  }
};

const weatherService = {
    getWeatherByName, 
    searchCity,
    getAirQuality
};

export default weatherService;