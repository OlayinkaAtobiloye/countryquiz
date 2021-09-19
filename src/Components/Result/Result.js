import React, { useState } from "react";
import Wrapper from "../hoc/Wrapper/Wrapper";
import "./Result.css";
import Container from "../hoc/Container/Container";
import Card from "../hoc/Card/Card";
import result from "../../Images/result.svg";
import Fetcher from "../fetcher";

const Result = (props) => {
  const [tryAgain, settryAgain] = useState(false);
  const handleClick = () => {
    settryAgain(true);
  };
  return !tryAgain ? (
    <Wrapper>
      <Container>
        <Card>
          <div className="alignCenter">
            <img src={result} className="result" />
            <h1 className="congratHeader">Results</h1>
            <p className="congratMessage">
              You got <span className="score">{props.totalScore}</span> correct
              answers
            </p>
            <button className="retry" onClick={handleClick}>
              Try Again
            </button>
          </div>
        </Card>
      </Container>
    </Wrapper>
  ) : (
    <Fetcher currentScore={0} />
  );
};

export default Result;
