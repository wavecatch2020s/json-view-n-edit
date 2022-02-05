import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";
import LongText from "./LongText";

const Group = ({ groupData }) => {
  let groupIndex = groupData.index;
  const dispatch = useDispatch();

  let displayData = [];

  const checkStringType = (key, value) => {
    if (key === "id" || key === "_id" || key === "guid") {
      displayData.push({ inputType: "id", key, value });
    } else if (
      String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      displayData.push({ inputType: "email", key, value });
    } else if (
      new Date(value.replace(/\s/g, "")) !== "Invalid Date" &&
      !isNaN(new Date(value.replace(/\s/g, ""))) &&
      !/^$/.test(value)
    ) {
      displayData.push({ inputType: "date", key, value });
    } else if (value.length > 35) {
      displayData.push({ inputType: "textarea", key, value });
    } else if (String(value).match(/^[$]\d*(?:\.\d{0,2})?/)) {
      displayData.push({ inputType: "currencyNumber", key, value });
    } else {
      displayData.push({ inputType: "string", key, value });
    }
  };

  const checkNumberType = (key, value) => {
    if (key === "index") {
      displayData.unshift({ inputType: "index", key, value });
    } else {
      displayData.push({ inputType: "number", key, value });
    }
  };

  const checkDataType = (key, value) => {
    let inputType = typeof value;
    if (inputType === "number") {
      checkNumberType(key, value);
    } else if (inputType === "boolean") {
      displayData.push({ inputType: "boolean", key, value });
    } else if (inputType === "string") {
      checkStringType(key, value);
    } else {
      return;
    }
  };

  for (const property in groupData) {
    checkDataType(property, groupData[property]);
  }

  const radioClickHandler = (e) => {
    let booleanValue = false;
    if (e.target.value === "true") {
      booleanValue = true;
    }
    let propertyName = e.target.name.slice(groupIndex.toString().length);
    dispatch(dataActions.changeValue([groupIndex, propertyName, booleanValue]));
  };

  function onBlurHandler(e) {
    let selectedDate = e.target.value;
    if (
      new Date(selectedDate.replace(/\s/g, "")) !== "Invalid Date" &&
      !isNaN(new Date(selectedDate.replace(/\s/g, "")))
    ) {
      dispatch(
        dataActions.changeValue([groupIndex, e.target.id, selectedDate])
      );
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode === 13) {
      if (e.target.value !== "") {
        dispatch(
          dataActions.changeValue([groupIndex, e.target.id, e.target.value])
        );
        e.target.value = "";
      }
    }
  }
  function keyUpCurrencyHandler(e) {
    if (e.keyCode === 13) {
      const newValue =
        "$" + e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (newValue !== "") {
        dispatch(dataActions.changeValue([groupIndex, e.target.id, newValue]));
        e.target.value = "";
      }
    }
  }

  const jsxToBeDisplayed = displayData.map((property) => {
    let jsxEditOption;
    if (property.inputType === "boolean") {
      jsxEditOption = (
        <div className="radio-buttons">
          <div className="radio-button">
            <input
              onChange={radioClickHandler}
              type="radio"
              id="true"
              name={`${groupIndex}${property.key}`}
              value="true"
              checked={property.value}
            />
            <label htmlFor="true">True</label>
          </div>

          <div className="radio-button">
            <input
              onChange={radioClickHandler}
              type="radio"
              id="false"
              name={`${groupIndex}${property.key}`}
              value="false"
              checked={!property.value}
            />
            <label htmlFor="false">False</label>
          </div>
        </div>
      );
    } else if (property.inputType === "date") {
      jsxEditOption = (
        <input onBlur={onBlurHandler} type="datetime-local" id={property.key} />
      );
    } else if (property.inputType === "textarea") {
      jsxEditOption = (
        <textarea
          placeholder="Set new value..."
          onKeyUp={keyUpHandler}
          id={property.key}
        />
      );
    } else if (property.inputType === "currencyNumber") {
      jsxEditOption = (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>$</span>
          <input
            style={{ maxWidth: "150px", marginLeft: "0" }}
            onKeyUp={keyUpCurrencyHandler}
            placeholder="Set new balance..."
            type="number"
            id={property.key}
          />
        </div>
      );
    } else if (
      ["id", "index", "date", "textarea", "currencyNumber"].includes(
        property.inputType
      ) !== true
    ) {
      jsxEditOption = (
        <input
          onKeyUp={keyUpHandler}
          placeholder="Set new value..."
          type={property.inputType}
          id={property.key}
        />
      );
    }

    return (
      <div
        key={property.key}
        className={`property ${property.key === "index" ? "index" : ""}`}
      >
        <h4>{property.key}</h4>
        {property.inputType !== "textarea" ? (
          <p>{property.value}</p>
        ) : (
          <LongText propertyValue={property.value} />
        )}

        {jsxEditOption ? jsxEditOption : ""}
      </div>
    );
  });

  return <div className="group">{jsxToBeDisplayed}</div>;
};

export default Group;
