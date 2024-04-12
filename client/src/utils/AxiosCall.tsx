import axios from "axios";

// const user = JSON.parse(localStorage.getItem("access_current_user") as string);

const AxiosCall = async ({ Url, Method, Data, Headers }: any) => {
  try {
    if (Method == "Get" || Method == "GET") {
      const { data } = await axios.get(Url, {
        headers: Headers,
      });
      return data;
    } else {
      const { data } = await axios.post(Url, Data ? Data : {}, {
        headers: Headers,
      });
      return data;
    }
  } catch (error: any) {
    return error.response.data;
  }
};

export default AxiosCall;
