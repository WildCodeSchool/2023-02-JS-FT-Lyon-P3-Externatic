import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
  baseURL: BACKEND_URL,
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
};

export default { api };
