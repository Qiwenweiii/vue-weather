import axios from 'axios';

// location 一般为城市 id，type 为需要请求的天气类型，当前天气：'now'，24小时天气：'24h'，未来一周天气：'7d'
export const useWeather = async (location, type) => {
  const weatherData = await axios.get(`https://devapi.qweather.com/v7/weather/${type}?key=d63bf1dc11fb44e6b78dfc81d64165b0&location=${location}`);

  return weatherData.data;
};
