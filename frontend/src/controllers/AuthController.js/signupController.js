import { useNavigate } from "react-router-dom";
import api from "../../components/api/api_instance";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../features/user/userSlice";
import { useEffect } from "react";

const AuthController = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const handleSubmit = async (event, formData) => {
    event.preventDefault();

    try {
      await api.post("/signup", formData);
      // Redirect to the home page ("/")
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const handlelogOut = async (event) =>{
    try {
    await api.get("/logout");
    // Redirect to the home page ("/")
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
    // Handle error
  }

  }


  return {
    user,
    handleSubmit,
    handlelogOut
  };
};

export default AuthController;
