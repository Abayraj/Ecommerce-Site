import { useNavigate } from "react-router-dom";
import api from "../components/api/api_instance";

const loginController = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const res = await api.post("/login", formData);
      console.log(res, formData);
      // Redirect to the home page ("/")
      navigate("/");
      window.location.reload();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errMessage) {
            console.log(error.response.data.errMessage)
            // Return the error message
            return error.response.data.errMessage;
        }
    }
  };

  return {
    handleSubmit, // Export handleSubmit function
  };
};

export default loginController;

