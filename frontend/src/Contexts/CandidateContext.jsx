import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CandidateContext = createContext();

export default CandidateContext;

export function CandidateContextProvider({ children }) {
  const [candidate, setCandidate] = useState(
    JSON.parse(localStorage.getItem("candidate") || "{}")
  );
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!candidate.id) navigate("/");
  }, [candidate.id]);

  // Helper function to check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    const currentTime = Date.now() / 1000;
    const tokenExpiration = token.exp;
    return tokenExpiration < currentTime;
  };

  const logoutCandidate = async () => {
    try {
      await axios.get(`${BACKEND_URL}/logout-candidate`);
      setCandidate({});
      localStorage.removeItem("candidate");
      navigate("/");
      toast.success("Vous avez été déconnecté.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur pendant la déconnexion.");
    }
  };

  const loginCandidate = (_candidate) => {
    setCandidate(_candidate);
    localStorage.setItem("candidate", JSON.stringify(_candidate));
  };

  useEffect(() => {
    // Check if the token is expired on every render
    if (isTokenExpired(candidate.token)) {
      logoutCandidate();
    }
  }, [candidate.token]);

  const memo = useMemo(() => {
    return {
      candidate,
      logoutCandidate,
      loginCandidate,
    };
  }, [candidate]);

  return (
    <CandidateContext.Provider value={memo}>
      {children}
    </CandidateContext.Provider>
  );
}

CandidateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCandidateContext = () => useContext(CandidateContext);
