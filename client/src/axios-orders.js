import axios from "axios";
const instance = axios.create({
  baseURL: "https://cryptic-harbor-56450.herokuapp.com/",
  // "http://localhost:5000/",
});

export default instance;
