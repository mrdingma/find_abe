import React, { useState, useEffect } from "react";
import EventEntry from "./EventEntry.jsx";

const Events = ({ dataArr }) => {
  // const [isDashboardView, setIsDashboardView] = useState();

  console.log(dataArr);
  let content = (
    <>
      {dataArr.length > 0
        ? dataArr.map(event => <EventEntry event={event} />)
        : null}
    </>
  );

  return content;
};

export default Events;
