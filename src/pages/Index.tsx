
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This is a redirect component
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to welcome page
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
