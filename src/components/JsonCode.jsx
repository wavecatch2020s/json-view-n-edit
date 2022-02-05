import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";

const JsonCode = () => {
  const textRef = useRef();
  const [jsonEdited, setJsonEdited] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const storeJsonData = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  const stringifiedData = JSON.stringify(storeJsonData);

  function submitJsonChanges() {
    const parsedJson = JSON.parse(textRef.current.value);
    setJsonEdited(false);
    setShowNotification(true);
    dispatch(dataActions.loadJsonData(parsedJson));
  }
  useEffect(() => {
    setTimeout(setShowNotification, 5000);
  }, [showNotification]);

  let btnStyle = "";
  if (jsonEdited) {
    btnStyle = { backgroundColor: "#76b4eb" };
  } else {
    btnStyle = {
      backgroundColor: "#cdd6df8d",
      color: "#33333350",
      boxShadow: "none",
    };
  }

  return (
    <div className="json-code-wrapper">
      {showNotification ? (
        <p className="notification">JSON Changed Successfully!</p>
      ) : (
        ""
      )}
      <button onClick={submitJsonChanges} style={btnStyle}>
        Save JSON
      </button>
      <textarea
        onKeyUp={() => setJsonEdited(true)}
        defaultValue={stringifiedData}
        ref={textRef}
      ></textarea>
    </div>
  );
};

export default JsonCode;
