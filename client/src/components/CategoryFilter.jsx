import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const CategoryFilter = ({ cat1, setCat1, cat2, setCat2, dataArr }) => {
  const uniqueArrGenerator = category => {
    const hash = {};

    if (category === "category1") {
      dataArr.forEach(({ category1 }) => {
        hash[category1] = 1;
      });
      return Object.keys(hash);
    } else {
      dataArr.forEach(({ category2 }) => {
        hash[category2] = 1;
      });
      return Object.keys(hash).length < 2 ? false : Object.keys(hash);
    }
  };

  let content = (
    <>
      <Col>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" onChange={e => setCat1(e.target.value)}>
            <option value="Select">Select</option>
            {uniqueArrGenerator("category1").map(c1 =>
              cat1 === c1 ? (
                <option value={c1} selected>
                  {c1}
                </option>
              ) : (
                <option value={c1}>{c1}</option>
              )
            )}
          </Form.Control>
        </Form.Group>
      </Col>
      {cat1 !== null && uniqueArrGenerator("category2") ? (
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Sub-Category</Form.Label>
            <Form.Control as="select" onChange={e => setCat2(e.target.value)}>
              <option value="Select">Select</option>
              {uniqueArrGenerator("category2").map(c2 =>
                cat2 === c2 ? (
                  <option value={c2} selected>
                    {c2}
                  </option>
                ) : (
                  <option value={c2}>{c2}</option>
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

export default CategoryFilter;
