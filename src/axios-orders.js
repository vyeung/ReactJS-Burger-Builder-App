import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactjs-burger-builder-afdd0.firebaseio.com/"
});

export default instance;