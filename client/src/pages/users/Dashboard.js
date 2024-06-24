import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
//{auth?.user?.name} = optional chainning

const Dashboard = () => {
  const [auth] = useAuth(); //auth ne destructure karyu
  return (
    <Layout title={"Dashboard - Vegitable App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-nd-3">
            <UserMenu />
          </div>
          <div className="col-nd-9">
            <div className="card w-75 p-3">
              <h3>name: {auth?.user?.name}</h3>
              <h3>email: {auth?.user?.email}</h3>
              <h3>Address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
