import axios from "axios";

let refresh = false;
axios.defaults.baseURL = "http://localhost:3001/";
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const response = await axios.post(
        "refresh",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["token"]}`;

        //resend the request after getting new token
        return axios(error.config);
      }
    }
    return error;
  }
);
