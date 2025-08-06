import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/tailorshop/api", // o'z server manziling
  headers: {
    "Content-Type": "application/json"
  }
});
