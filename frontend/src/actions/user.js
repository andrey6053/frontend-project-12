import axios from "axios";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post("/api/v1/login", {
      username,
      password,
    });
    return { status: 200, data: response.data };
  } catch (e) {
    return { status: 400, data: e.response.data.message };
  }
};

export const signUp = async ({ username, password }) => {
  try {
    const response = await axios.post("/api/v1/signup", {
      username,
      password,
    });
    return response.data;
  } catch (e) {
    console.log(e.response.data.message);
  }
};
