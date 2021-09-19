import React from "react";
import Wrapper from "../hoc/Wrapper/Wrapper";
import "./Question.css";
import Container from "../hoc/Container/Container";
import Card from "../hoc/Card/Card";
import adventure from "../../Images/adventure.svg";
import Fetcher from "../fetcher";
import Result from "../Result/Result";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextQuestion: false,
      correctAnswer: null,
      chosenOption: 4,
      checkedAnswer: false,
      optionsClasses: ["option", "clickedOption"],
      currentScore: this.props.currentScore,
    };
  }

  handleClick = () => {
    this.setState((prevState, props) => {
      return { nextQuestion: true };
    });
  };

  checkAnswer = (data, index) => {
    if (!this.state.checkedAnswer) {
      if (data == this.props.countryInfo.name) {
        this.setState((prevState, props) => {
          return {
            correctAnswer: true,
            checkedAnswer: true,
            chosenOption: index,
            optionsClasses: [...prevState.optionsClasses, "correctOption"],
            currentScore: prevState.currentScore + 1,
          };
        });
      } else {
        this.setState((prevState, props) => {
          return {
            correctAnswer: false,
            checkedAnswer: true,
            chosenOption: index,
            optionsClasses: [...prevState.optionsClasses, "incorrectOption"],
          };
        });
      }
    }
  };

  render() {
    let classes = this.state.optionsClasses.join(" ");
    const correctAnswerClasses = ["option", "correctOption", "clickedOption"];

    return !this.state.nextQuestion ? (
      <Wrapper>
        <Container>
          <img src={adventure} alt="idk" className="adventure" />
          <Card>
            {this.props.questionType == "flag" ? (
              <img
                src={this.props.countryInfo.flag}
                className="countryFlag"
              ></img>
            ) : null}
            <h2 className="question">{this.props.question}</h2>
            <ul className="options">
              <li
                className={
                  this.state.checkedAnswer && this.state.chosenOption == 0
                    ? classes
                    : this.state.correctAnswer != null &&
                      this.props.options[0] == this.props.countryInfo.name
                    ? correctAnswerClasses.join(" ")
                    : "option"
                }
                onClick={this.checkAnswer.bind(this, this.props.options[0], 0)}
              >
                <span className="optionLetter">A</span>
                {this.props.options[0]}
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.chosenOption == 0 &&
                    this.props.options[0] != this.props.countryInfo.name
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  cancel
                </span>
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.props.countryInfo.name == this.props.options[0]
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  check
                </span>
              </li>

              <li
                className={
                  this.state.checkedAnswer && this.state.chosenOption == 1
                    ? classes
                    : this.state.checkedAnswer &&
                      this.props.options[1] == this.props.countryInfo.name
                    ? correctAnswerClasses.join(" ")
                    : "option"
                }
                onClick={this.checkAnswer.bind(this, this.props.options[1], 1)}
              >
                <span className="optionLetter">B</span>
                {this.props.options[1]}
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.chosenOption == 1 &&
                    this.props.options[1] != this.props.countryInfo.name
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  cancel
                </span>
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.props.countryInfo.name == this.props.options[1]
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  check
                </span>
              </li>

              <li
                className={
                  this.state.checkedAnswer && this.state.chosenOption == 2
                    ? classes
                    : this.state.checkedAnswer &&
                      this.props.options[2] == this.props.countryInfo.name
                    ? correctAnswerClasses.join(" ")
                    : "option"
                }
                onClick={this.checkAnswer.bind(this, this.props.options[2], 2)}
              >
                <span className="optionLetter">C</span>
                {this.props.options[2]}
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.chosenOption == 2 &&
                    this.props.options[2] != this.props.countryInfo.name
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  cancel
                </span>
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.props.countryInfo.name == this.props.options[2]
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  check
                </span>
              </li>

              <li
                className={
                  this.state.checkedAnswer && this.state.chosenOption == 3
                    ? classes
                    : this.state.checkedAnswer &&
                      this.props.options[3] == this.props.countryInfo.name
                    ? correctAnswerClasses.join(" ")
                    : "option"
                }
                onClick={this.checkAnswer.bind(this, this.props.options[3], 3)}
              >
                <span className="optionLetter">D</span>
                {this.props.options[3]}
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.chosenOption == 3 &&
                    this.props.options[3] != this.props.countryInfo.name
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  cancel
                </span>
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.props.countryInfo.name == this.props.options[3]
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  check
                </span>
              </li>
            </ul>

            <button
              className="next"
              onClick={this.handleClick.bind(this)}
              style={
                this.state.checkedAnswer
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              Next
            </button>
          </Card>
        </Container>
      </Wrapper>
    ) : !this.state.correctAnswer && this.state.nextQuestion ? (
      <Result totalScore={this.state.currentScore} />
    ) : (
      <Fetcher currentScore={this.state.currentScore} />
    );
  }
}

export default Question;
