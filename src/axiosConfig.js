import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 5000,
});

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const postRequest = async (url, data) => {
  try {
    const response = await instance.post(url, data, config);
    toast.success("Reservation Saved!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return response.data;
  } catch (error) {
    if (error.response.data.errors) {
      error.response.data.errors.forEach((errorMessage) => {
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
    throw new Error(`Error making POST request: ${error.message}`);
  }
};

const updateRequest = async (url, id, data) => {
  try {
    const response = await instance.put(`${url}/${id}`, data, config);
    toast.success("Reservation Updated!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return response.data;

  } catch (error) {
    if (error.response.data.errors) {
      error.response.data.errors.forEach((errorMessage) => {
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const deleteRequest = async (url, id) => {
  try {
    const response = await instance.delete(`${url}/${id}`, config);
    toast.success("Reservation Deleted!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return response.data;

  } catch (error) {
    if (error.response.data.errors) {
      error.response.data.errors.forEach((errorMessage) => {
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export { instance as axiosInstance, postRequest, updateRequest, deleteRequest};
