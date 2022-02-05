import React from "react";
import { useSelector } from "react-redux";
import EditDashboard from "./EditDashboard";
import JsonCode from "./JsonCode";

const MainDisplay = () => {
  const showJson = useSelector((state) => state.ui.showJsonCode);

  return (
    <div className="main-container">
      {!showJson ? <EditDashboard /> : <JsonCode />}
    </div>
  );
};

export default MainDisplay;
