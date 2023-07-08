import axios from 'axios';

// location 可以是个城市名字符串，也可以是经纬度
export const useCity = async (location) => {
  const cityData = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=d63bf1dc11fb44e6b78dfc81d64165b0`);

  return cityData.data;
};
