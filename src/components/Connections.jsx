import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice.js";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  // Fetch connections from API
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Handle removing a connection
  const deleteConnection = async (_id) => {
    try {
      await axios.get(BASE_URL + "/remove/" + _id, {
        withCredentials: true,
      });
      fetchConnections();
    } catch (err) {
      console.error(err);
    }
  };

  // Render no connections message
  if (!connections || connections.length === 0) {
    return (
      <div className="w-full mt-2">
        <div className="btn btn-primary flex justify-center">
          <span>You Have No Connections</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="w-full mb-3 text-center">
        <div className="btn btn-primary font-semibold text-gray-800">
          Connections
        </div>
      </div>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, about } = connection;
        return (
          <div
            key={_id}
            className="max-w-3xl mx-auto mt-3 flex flex-col md:flex-row items-center bg-gray-300 rounded-xl shadow-lg p-3 space-y-2 md:space-y-0 md:space-x-6 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              alt="photo"
              className="w-20 h-20 m-3 rounded-full"
              src={photoUrl}
            />
            <div className="ml-3 text-black">
              <h1 className="mt-4 font-bold text-black text-2xl">
                {firstName + " " + lastName}
              </h1>
              <p>{about}</p>
            </div>
            <button
              className="btn btn-primary hover:bg-red-600 ml-9 my-auto"
              onClick={() => deleteConnection(_id)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
