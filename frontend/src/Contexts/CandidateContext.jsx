import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CandidateContext = createContext();

export default CandidateContext;

export function CandidateContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [candidate, setCandidate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!candidate.id) navigate("/");
  }, [candidate.id]);

  const logout = async () => {
    try {
      // await axios.get(`${BACKEND_URL}/logout`);
      setCandidate({});
    } catch (error) {
      console.error(error);
    }
  };

  const login = (_candidate) => {
    setCandidate(_candidate);
  };

  const memo = useMemo(() => {
    return {
      candidate,
      logout,
      login,
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
