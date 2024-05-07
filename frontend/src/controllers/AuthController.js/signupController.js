import { useNavigate } from "react-router-dom";
import api from "../../components/api/api_instance";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../features/user/userSlice";
import { useEffect } from "react";

const SignupController = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const handleSubmit = async (formData) => {
    try {
      await api.post("/signup", formData);
      // Redirect to the home page ("/")
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error,'froont')
      if (error.response && error.response.data && error.response.data.errMessage) {
        console.log(error.response.data.errMessage)
        // Return the error message
        return error.response.data.errMessage;
      } else {
        // Return a generic error message
        return "An error occurred while processing your request.";
      }
    }
  };

  const handlelogOut = async (event) => {
    try {
      await api.get("/logout");
      // Redirect to the home page ("/")
      navigate("/");
      window.location.reload();
    } catch (error) {
      // Handle error
      throw error;
    }
  }

  return {
    user,
    handleSubmit,
    handlelogOut
  };
};

export default SignupController;
