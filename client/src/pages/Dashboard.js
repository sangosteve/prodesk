import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const Dashboard = () => {
  const { user } = useAuth0();

  return <>{/* <h1>{`Hie ${user.name} Welcome to your Dashboard`}</h1> */}</>;
};

export default Dashboard;
