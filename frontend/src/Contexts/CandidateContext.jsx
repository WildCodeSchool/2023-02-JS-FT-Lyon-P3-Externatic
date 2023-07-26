import { createContext, useContext, useMemo, useState } from "react";
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
