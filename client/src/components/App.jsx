import React, { useState, useEffect } from "react";
import { Spinner, Container, Row, Col, Form } from "react-bootstrap";
import DateFilter from "./DateFilter.jsx";
import SearchBar from "./SearchBar.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import Events from "./Events.jsx";
import axios from "axios";

const App = props => {
  // CATEGORY FILTER
  const [cat1, setCat1] = useState(null);
  const [cat2, setCat2] = useState(null);

  // SEARCHBAR
  const [keyword, setKeyword] = useState(null);

  // DATE FILTER
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  // DB DATA
  const [dataArr, setDataArr] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [homePage, setHomePage] = useState(true);
  const [hoverAbe, setHoverAbe] = useState(false);

  const dateBuilder = () => {
    if (month !== null && day !== null) {
      return `date=${year}/${month}/${day}`;
    }
    return false;
  };

  const keywordBuilder = () => {
    return keyword !== null ? `q=${keyword}` : false;
  };

  const cat1Builder = () => {
    return cat1 !== null ? `category1=${cat1}` : false;
  };

  const cat2Builder = () => {
    return cat2 !== null ? `category2=${cat2}` : false;
  };

  const resetSearch = () => {
    setYear(null);
    setMonth(null);
    setDay(null);
    setCat1(null);
    setCat2(null);
  };

  const getAll = () => {
    let url = `/events?`;
    const queries = ["_sort=dates", "_order=asc"];

    if (dateBuilder()) {
      queries.unshift(dateBuilder());
    }

    if (cat1Builder()) {
      queries.unshift(cat1Builder());
    }

    if (cat2Builder()) {
      queries.unshift(cat2Builder());
    }

    if (keywordBuilder()) {
      queries.unshift(keywordBuilder());
    }

    url += queries.join("&");

    setIsLoading(true);
    axios
      .get(url)
      .then(({ data }) => {
        setDataArr(data);
        setHomePage(false);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (keyword !== null) {
      getAll();
    }
  }, [keyword, year, month, day, cat1, cat2]);

  let content = (
    <div style={{ position: "absolute", top: "30%", left: "50%" }}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  if (homePage) {
    content = (
      <>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <div
            onMouseEnter={() => setHoverAbe(true)}
            onMouseLeave={() => setHoverAbe(false)}
          >
            {hoverAbe ? <img src="logo2.png" /> : <img src="logo.png" />}
          </div>
        </Container>
        <div>
          <SearchBar
            resetSearch={resetSearch}
            keyword={keyword}
            setKeyword={setKeyword}
            isLoading={isLoading}
          />
        </div>
      </>
    );
  }

  if (!homePage && !isLoading) {
    content = (
      <>
        <Container style={{ marginTop: "35px" }}>
          <Row>
            <SearchBar
              resetSearch={resetSearch}
              keyword={keyword}
              setKeyword={setKeyword}
              isLoading={isLoading}
            />
            <DateFilter
              year={year}
              month={month}
              day={day}
              setMonth={setMonth}
              setDay={setDay}
              setYear={setYear}
              dataArr={dataArr}
            />
            <CategoryFilter
              cat1={cat1}
              cat2={cat2}
              setCat1={setCat1}
              setCat2={setCat2}
              dataArr={dataArr}
            />
          </Row>
        </Container>
        <Container>
          <Row>
            <Events dataArr={dataArr} />
          </Row>
        </Container>
      </>
    );
  }

  return content;
};

export default App;
