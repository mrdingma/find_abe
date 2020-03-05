import React, { useState, useEffect } from "react";
import EventEntry from "./EventEntry.jsx";
import Pagination from "react-bootstrap/Pagination";

const Events = ({ dataArr }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const len = dataArr.length;
  const maxPage = Math.ceil(len / 5);

  const pageNumberArr = () => {
    let result = [];
    let start = 1;
    let end = Math.min(maxPage, Math.max(currentPage + 4, 10));

    if (currentPage - 5 > 0) {
      start = currentPage - 5;
    }

    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };

  let content = <></>;

  if (len > 0) {
    content = (
      <>
        <div style={{ marginLeft: "20px", fontSize: "12px" }}>
          Page {currentPage} of about {len} results
        </div>
        {dataArr.slice((currentPage - 1) * 5, currentPage * 5).map(event => (
          <EventEntry event={event} />
        ))}
        <Pagination style={{ marginTop: "5%", marginLeft: "25%" }}>
          {currentPage !== 1 ? (
            <>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </>
          ) : null}
          {pageNumberArr().map(number => {
            if (number === currentPage) {
              return (
                <Pagination.Item onClick={() => setCurrentPage(number)} active>
                  {number}
                </Pagination.Item>
              );
            }
            return (
              <Pagination.Item onClick={() => setCurrentPage(number)}>
                {number}
              </Pagination.Item>
            );
          })}
          {currentPage !== maxPage ? (
            <>
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
              />
              <Pagination.Last onClick={() => setCurrentPage(maxPage)} />
            </>
          ) : null}
        </Pagination>
      </>
    );
  }

  return content;
};

export default Events;
