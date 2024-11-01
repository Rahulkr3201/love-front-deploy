import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constant.js";
import axios from "axios";
import { removeUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  //console.log(user);
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
    <div className="navbar bg-base-300 ">
      <div className="flex-1">
        <p className=" text-4xl ml-3 font-bold text-secondary">Luv</p>
        <p className=" text-4xl font-bold text-primary ">Tinder</p>
         {user && (
          <p>
            <Link to="/" className="btn btn-secondary mx-12 my-2 ">
              Home Page
            </Link>
          </p>
        )}
      </div>

      <div className="flex-none gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-7 flex">
            <p className="mt-2.5 mx-2 text-xl font-semibold text-white">
              {user.firstName} {user.lastName}
            </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 h-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between mt-1 text-lg text-white   hover:bg-secondary"
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Connections"
                  className="justify-between mt-1 text-lg text-white  hover:bg-secondary"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/request"
                  className="justify-between mt-1 text-lg text-white   hover:bg-secondary"
                >
                  Pending Request
                </Link>
              </li>
              <li>
                <a
                  className="justify-between mt-1 text-lg text-white hover:bg-secondary"
                  onClick={handleLogOut}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
