import React, { useState, useEffect } from "react";
import EventEntry from "./EventEntry.jsx";
import Pagination from "react-bootstrap/Pagination";

const Events = ({ dataArr }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const len = dataArr.length;
  const maxPage = Math.ceil(len / 5);

  const pageNumberArr = () => {
    let result = [];

    for (let i = 1; i <= maxPage; i++) {
      result.push(i);
    }
    return result;
  };

  let content = <></>;

  if (len > 0) {
    content = (
      <>
        {dataArr.slice((currentPage - 1) * 5, currentPage * 5).map(event => (
          <EventEntry event={event} />
        ))}
        <Pagination>
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
              return <Pagination.Item active>{number}</Pagination.Item>;
            }
            return <Pagination.Item>{number}</Pagination.Item>;
          })}
          {currentPage !== maxPage ? (
            <>
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
              />
              <Pagination.Last onClick={() => setCurrentPage(maxPage)} />
              />
            </>
          ) : null}
        </Pagination>
      </>
    );
  }

  return content;
};

export default Events;
