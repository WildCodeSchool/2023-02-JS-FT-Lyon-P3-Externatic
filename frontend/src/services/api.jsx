import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export const api = {
  jobsAvailables: async () => {
    try {
      const res = await instance.get("/categories");
      return res.data;
    } catch (error) {
      console.error(error);
    }

    return undefined;
  },
  contractsAvailables: async () => {
    try {
      const res = await instance.get("/jobtype");
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  },

  citiesAvailables: async () => {
    try {
      const res = await instance.get("/joblocation");
      return res.data;
    } catch (error) {
      console.error(error);
    }

    return undefined;
  },

  sendEmail: async (info) => {
    try {
      const res = await instance.post("/sendemail", info);
      return res.data;
    } catch (error) {
      console.error(error);
    }

    return undefined;
  },

  getAlljobOffers: async (info) => {
    try {
      const res = await instance.get("/jobs", info);
      return res.data;
    } catch (error) {
      console.error(error);
    }

    return undefined;
  },
};

export default { api };
