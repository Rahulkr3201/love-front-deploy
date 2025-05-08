import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, [userData, dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <motion.main
        className="flex-grow relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1028726/pexels-photo-1028726.jpeg')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Overlay for readability */}
        <div className="w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default Body;
