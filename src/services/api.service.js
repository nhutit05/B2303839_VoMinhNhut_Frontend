import axios from "axios";

const commonConfig = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default (baseUrl) => {
  return axios.create({
    baseUrl,
    ...commonConfig,
  });
};
