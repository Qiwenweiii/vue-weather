import axios from 'axios';
import { API_KEY } from '../../config';

// location 可以是个城市名字符串，也可以是经纬度
export async function useCity(location) {
  const cityData = await axios.get(
    `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${API_KEY}`
  );

  return cityData.data;
}
