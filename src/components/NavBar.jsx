import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constant.js";
import axios from "axios";
import { removeUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaUsers,
  FaUserPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="navbar bg-gradient-to-t shadow-lg p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Section */}
      <div className="flex-1 flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <p className="text-5xl font-bold text-white">Dev</p>
          <p className="text-5xl font-bold text-white">Tinder</p>
        </Link>
        {/* Show Home button only if user is logged in */}
        {user && (
          <Link
            to="/"
            className="  btn btn-primary flex items-center space-x-1 ml-16"
          >
            <FaHome />
            <span>Home</span>
          </Link>
        )}
      </div>

      {/* Right Section */}
      <div className="flex-none gap-4">
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center space-x-3">
              <p className="text-lg font-medium text-white">
                {user.firstName} {user.lastName}
              </p>
              <motion.div
                className="btn btn-ghost btn-circle avatar"
                whileHover={{ scale: 1.1 }}
                tabIndex={0}
              >
                <div className="w-10 rounded-full bg-white">
                  <img alt="user avatar" src={user.photoUrl} />
                </div>
              </motion.div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 bg-pink-400 rounded-box mt-2 w-52 space-y-2"
              style={{ right: 0, zIndex: 50 }} // Ensures dropdown is visible
            >
              <li>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2  text-white  hover:bg-purple-600 rounded-lg p-2"
                >
                  <FaUserCircle />
                  <span>Profile</span>
                  <span className="badge badge-secondary">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Connections"
                  className="flex items-center  text-white  space-x-2 hover:bg-purple-600 rounded-lg p-2"
                >
                  <FaUsers />
                  <span>Connections</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/request"
                  className="flex items-center text-md text-white  space-x-2 hover:bg-purple-600 rounded-lg p-2"
                >
                  <FaUserPlus />
                  <span>Pending Requests</span>
                </Link>
              </li>
              <li>
                <motion.a
                  className="flex items-center space-x-2 hover:bg-red-500 text-white rounded-lg p-2"
                  onClick={handleLogOut}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </motion.a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NavBar;
