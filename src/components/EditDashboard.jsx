import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Group from "./Group";

const EditDashboard = () => {
  const storeJsonData = useSelector((state) => state.data.data);
  const jsonGroups = storeJsonData.map((groupData) => {
    return <Group groupData={groupData} key={groupData._id} />;
  });
  return (
    <Fragment>
      <div className="group">
        <p>
          Task: The system should create a page where for every array member in
          the JSON file we will see a row with property-value and under it input
          fields to edit the value for every property of the array member.
        </p>
        <p style={{ marginLeft: "1rem" }}>
          {" "}
          So basically a row where we view data of array member of the JSON file
          and a row where we edit data of that array member. The page will
          render these groups for every array member. If the JSON has 10 array
          members, it will render 10 groups of 2 rows. If it has 1000 array
          members, it will render 1000 groups of 2 rows.
        </p>
      </div>
      {jsonGroups}
    </Fragment>
  );
};

export default EditDashboard;
