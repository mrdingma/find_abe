import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

const EventEntry = ({ event }) => {
  const stringParser = string => {
    let description = "";
    const citeStart = string.indexOf("{");

    if (citeStart !== -1) {
      description = string.slice(0, citeStart);
    } else {
      description = string;
    }

    return {
      description,
      url: string.match(/http(.)+?(?=\")/gi).filter(a => !a.includes("<"))
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
    <div style={{ margin: "20px", fontSize: "16px" }}>{description}</div>
  );

  if (url) {
    content = (
      <OverlayTrigger
        placement="right"
        trigger={["hover", "focus"]}
        delay={{ show: 300, hide: 400 }}
        overlay={popover}
      >
        <div style={{ margin: "20px", fontSize: "16px" }}>{description}</div>
      </OverlayTrigger>
    );
  }

  return content;
};

export default EventEntry;
