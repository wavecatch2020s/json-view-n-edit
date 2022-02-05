import React, { useState } from "react";
import { uiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const [seeJsonCode, setSeeJsonCode] = useState(false);

  const clickHandler = () => {
    setSeeJsonCode(!seeJsonCode);
    dispatch(uiActions.showJson(!seeJsonCode));
  };

  const editJsonHandler = () => {
    setSeeJsonCode(false);
    dispatch(uiActions.showJson(false));
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <h2 style={{ cursor: "pointer" }} onClick={editJsonHandler}>
          JSON View & Edit
        </h2>
        <button onClick={clickHandler}>
          {seeJsonCode ? "Edit JSON" : "See JSON"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
