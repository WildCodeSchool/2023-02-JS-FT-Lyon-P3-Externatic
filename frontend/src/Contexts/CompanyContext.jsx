import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const logoutCompany = async () => {
    try {
      await axios.get(`${BACKEND_URL}/logout-company`);
      setCompany({});
      localStorage.removeItem("company");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const loginCompany = (_company) => {
    setCompany(_company);
    localStorage.setItem("company", JSON.stringify(_company));
  };

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
