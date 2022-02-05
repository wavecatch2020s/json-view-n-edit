import React, { Fragment, useState } from "react";

const LongText = ({ propertyValue }) => {
  const [seeMoreState, setSeeMoreState] = useState(false);

  return (
    <Fragment>
      <p className={!seeMoreState ? "long-text" : "hidden"}>{propertyValue}</p>
      <span className="see-more" onClick={() => setSeeMoreState(!seeMoreState)}>
        {!seeMoreState ? "See More" : "See Less"}
      </span>
    </Fragment>
  );
};

export default LongText;
