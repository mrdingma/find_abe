import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

const EventEntry = ({ event }) => {
  const stringParser = string => {
    let description = "";
    let url = "";
    const citeStart = string.indexOf("{");

    if (citeStart !== -1) {
      description = string.slice(0, citeStart);
    } else {
      description = string;
    }

    const citeStart2 = description.indexOf("<");

    if (citeStart2 !== -1) {
      description = description.slice(0, citeStart2);
    }

    if (string.match(/(?<=>)htt(.)+?(?=<)/gi)) {
      url = string.match(/(?<=>)htt(.)+?(?=<)/gi);
    } else {
      url = [];
    }

    return {
      description,
      url
    };
  };

  const { description, url } = stringParser(event.description);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Citations</Popover.Title>
      <Popover.Content>
        <ul>
          {url.map(site => (
            <li>{site}</li>
          ))}
        </ul>
      </Popover.Content>
    </Popover>
  );

  let content = (
    <div style={{ margin: "20px", fontSize: "16px", width: "100%" }}>
      <div>{event.date}</div>
      <div>{description}</div>
    </div>
  );

  if (url.length > 0) {
    content = (
      <OverlayTrigger
        placement="right"
        trigger={["hover", "focus"]}
        delay={{ show: 300, hide: 400 }}
        overlay={popover}
      >
        <div style={{ margin: "20px", fontSize: "16px", width: "100%" }}>
          <div>{event.date}</div>
          <div>{description}</div>
        </div>
      </OverlayTrigger>
    );
  }

  return content;
};

export default EventEntry;
