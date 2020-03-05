import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const DateFilter = ({
  year,
  month,
  day,
  setYear,
  setMonth,
  setDay,
  dataArr
}) => {
  const uniqueArrGenerator = option => {
    const hash = {};

    dataArr.forEach(({ date }) => {
      const [year, month, day] = date.split("/");
      if (option === "year") {
        hash[year] = 1;
      }
      if (option === "month") {
        hash[month] = 1;
      }
      if (option === "day") {
        hash[day] = 1;
      }
    });
    return Object.keys(hash);
  };

  let content = (
    <>
      <Col>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Year</Form.Label>
          <Form.Control as="select" onChange={e => setYear(e.target.value)}>
            <option value="All">Year</option>
            {uniqueArrGenerator("year").map(y =>
              y === year ? (
                <option value={y} selected>
                  {y}
                </option>
              ) : (
                <option value={y}>{y}</option>
              )
            )}
          </Form.Control>
        </Form.Group>
      </Col>
      {year !== null ? (
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Month</Form.Label>
            <Form.Control as="select" onChange={e => setMonth(e.target.value)}>
              <option value="All">Month</option>
              {uniqueArrGenerator("month").map(m =>
                m === month ? (
                  <option value={m} selected>
                    {m}
                  </option>
                ) : (
                  <option value={m}>{m}</option>
                )
              )}
            </Form.Control>
          </Form.Group>
        </Col>
      ) : null}
      {month !== null ? (
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Day</Form.Label>
            <Form.Control as="select" onChange={e => setDay(e.target.value)}>
              <option value="All">Day</option>
              {uniqueArrGenerator("day").map(d =>
                d === day ? (
                  <option value={d} selected>
                    {d}
                  </option>
                ) : (
                  <option value={d}>{d}</option>
                )
              )}
            </Form.Control>
          </Form.Group>
        </Col>
      ) : null}
    </>
  );

  return content;
};

export default DateFilter;
