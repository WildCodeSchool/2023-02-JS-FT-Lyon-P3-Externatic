import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyContext = createContext();

export default CompanyContext;

export function CompanyContextProvider({ children }) {
  const [company, setCompany] = useState(
    JSON.parse(localStorage.getItem("company") || "{}")
  );
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!company.id) navigate("/");
  }, [company.id]);

  // Helper function to check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    const currentTime = Date.now() / 1000;
    const tokenExpiration = token.exp;
    return tokenExpiration < currentTime;
  };

  const logoutCompany = async () => {
    try {
      await axios.get(`${BACKEND_URL}/logout-company`);
      setCompany({});
      localStorage.removeItem("company");
      navigate("/");
      toast.success("Vous avez été déconnecté.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur pendant la déconnexion.");
    }
  };

  const loginCompany = (_company) => {
    setCompany(_company);
    localStorage.setItem("company", JSON.stringify(_company));
  };

  useEffect(() => {
    // Check if the token is expired on every render
    if (isTokenExpired(company.token)) {
      logoutCompany();
    }
  }, [company.token]);

  const memo = useMemo(() => {
    return {
      company,
      logoutCompany,
      loginCompany,
    };
  }, [company]);

  return (
    <CompanyContext.Provider value={memo}>{children}</CompanyContext.Provider>
  );
}

CompanyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCompanyContext = () => useContext(CompanyContext);
