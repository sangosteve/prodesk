import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import CommentCard from "../components/CommentCard";
const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  console.log(JSON.parse(auth).username);
  return (
    <>
      <div>Dashboard</div>
      <div>
        <h4>{`Hie ${JSON.parse(auth).username}`}</h4>
      </div>
      {/* <div className="w-2/6 p-8">
        <CommentCard />
      </div> */}
    </>
  );
};

export default Dashboard;
