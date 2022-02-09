import { sendGet } from "./axios";

const getWeatherByName = async (name = "Hanoi") => {
    try {
      const res = await sendGet(`/weather?q=${name}&units=metric&appid=1194cb71b2922d22d0acc81dccb15346`);
      return res;
    } catch (error) {
      return error;
    }
};

const weatherService = {
    getWeatherByName, 
};

export default weatherService;