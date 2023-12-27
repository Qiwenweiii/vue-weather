import axios from 'axios';
import { API_KEY } from '../../config';

// location 一般为城市 id，type 为需要请求的天气类型，当前天气：'now'，24小时天气：'24h'，未来一周天气：'7d'
export async function useWeather(location, type) {
  const weatherData = await axios.get(
    `https://devapi.qweather.com/v7/weather/${type}?key=${API_KEY}&location=${location}`
  );

  return weatherData.data;
}
