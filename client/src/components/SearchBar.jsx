import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Icon } from "react-materialize";

const SearchBar = props => {
  const [text, setText] = useState(props.keyword);

  const clickHandler = () => {
    props.resetSearch();
    props.setKeyword(text);
  };

  let content = (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Group
              controlId="exampleForm.ControlInput1"
              style={{ display: "flex" }}
            >
              <div style={{ alignSelf: "center" }}>
                <Icon medium>search</Icon>
              </div>
              <Form.Control
                type="text"
                style={{ borderRadius: "100px", width: "80%" }}
                onChange={e => setText(e.target.value)}
                value={text}
              />
              {props.isLoading ? (
                <Button
                  variant="primary"
                  style={{ marginLeft: "15px" }}
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              ) : (
                <Button
                  as="input"
                  type="submit"
                  style={{ marginLeft: "15px", cursor: "pointer" }}
                  value="Abe Search"
                  onClick={clickHandler}
                />
              )}
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </>
  );

  return content;
};

export default SearchBar;
