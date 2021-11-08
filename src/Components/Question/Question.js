import React from "react";
import Wrapper from "../hoc/Wrapper/Wrapper";
import "./Question.css";
import Container from "../hoc/Container/Container";
import Card from "../hoc/Card/Card";
import adventure from "../../Images/adventure.svg";
import Fetcher from "../fetcher";
import Result from "../Result/Result";
import axios from "axios";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextQuestion: false,
      correctAnswer: null,
      chosenOption: 4,
      checkedAnswer: false,
      optionsClasses: ["option", "clickedOption"],
      currentScore: 0,
      countryInfo: null,
    };
  }

  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.nextQuestion && this.state.correctAnswer) {
      let availableTypes = ["flag", "capital"];
      let responseLength = this.state.response.length;
      let countryInfo =
        this.state.response[Math.floor(Math.random() * responseLength)];
      let questionType =
        availableTypes[Math.floor(Math.random() * availableTypes.length)];
      var options = [];
      let option1 =
        this.state.response[
          Math.floor(Math.random() * this.state.response.length)
        ].name;
      let option2 =
        this.state.response[
          Math.floor(Math.random() * this.state.response.length)
        ].name;
      let option3 =
        this.state.response[
          Math.floor(Math.random() * this.state.response.length)
        ].name;
      options.push(option1, option2, option3, countryInfo.name);
      options = this.shuffle(options);
      this.setState(() => {
        return {
          countryInfo: countryInfo,
          questionType: questionType,
          currentScore: prevState.currentScore,
          nextQuestion: false,
          correctAnswer: null,
          checkedAnswer: false,
          chosenOption: null,
          options: options,
        };
      });
    }
  }

  componentDidMount() {
    axios
      .get("https://restcountries.com/v2/all?fields=name,capital,flag")
      .then((response) => {
        let availableTypes = ["flag", "capital"];
        let responseLength = response.data.length;
        let countryInfo =
          response.data[Math.floor(Math.random() * responseLength)];
        let questionType =
          availableTypes[Math.floor(Math.random() * availableTypes.length)];
        var options = [];
        let option1 =
          response.data[Math.floor(Math.random() * response.data.length)].name;
        let option2 =
          response.data[Math.floor(Math.random() * response.data.length)].name;
        let option3 =
          response.data[Math.floor(Math.random() * response.data.length)].name;
        options.push(option1, option2, option3, countryInfo.name);
        options = this.shuffle(options);

        this.setState(() => {
          return {
            countryInfo: countryInfo,
            questionType: questionType,
            response: response.data,
            options: options,
          };
        });
      });
  }

  handleClick = () => {
    this.setState((prevState, props) => {
      return { nextQuestion: true };
    });
  };

  checkAnswer = (data, index) => {
    if (!this.state.checkedAnswer) {
      if (data == this.state.countryInfo.name) {
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

    return !this.state.correctAnswer && this.state.nextQuestion ? (
      <Result totalScore={this.state.currentScore} />
    ) : this.state.response ? (
      <Wrapper>
        <Container>
          <img src={adventure} alt="idk" className="adventure" />
          <Card>
            {this.state.questionType == "flag" ? (
              <img
                src={this.state.countryInfo.flag}
                className="countryFlag"
              ></img>
            ) : null}
            <h2 className="question">
              {this.state.questionType == "capital"
                ? `${this.state.countryInfo.capital} is the capital of`
                : "This flag belongs to what country?"}
            </h2>
            <ul className="this.state.options">
              <li
                className={
                  this.state.checkedAnswer && this.state.chosenOption == 0
                    ? classes
                    : this.state.correctAnswer != null &&
                      this.state.options[0] == this.state.countryInfo.name
                    ? correctAnswerClasses.join(" ")
                    : "option"
                }
                onClick={this.checkAnswer.bind(this, this.state.options[0], 0)}
              >
                <span className="optionLetter">A</span>
                {this.state.options[0]}
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.chosenOption == 0 &&
                    this.state.options[0] != this.state.countryInfo.name
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  cancel
                </span>
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.countryInfo.name == this.state.options[0]
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
                      this.state.options[1] == this.state.countryInfo.name
                    ? correctAnswerClasses.join(" ")
                    : "option"
                }
                onClick={this.checkAnswer.bind(this, this.state.options[1], 1)}
              >
                <span className="optionLetter">B</span>
                {this.state.options[1]}
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.chosenOption == 1 &&
                    this.state.options[1] != this.state.countryInfo.name
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  cancel
                </span>
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.countryInfo.name == this.state.options[1]
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
                      this.state.options[2] == this.state.countryInfo.name
                    ? correctAnswerClasses.join(" ")
                    : "option"
                }
                onClick={this.checkAnswer.bind(this, this.state.options[2], 2)}
              >
                <span className="optionLetter">C</span>
                {this.state.options[2]}
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.chosenOption == 2 &&
                    this.state.options[2] != this.state.countryInfo.name
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  cancel
                </span>
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.countryInfo.name == this.state.options[2]
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
                      this.state.options[3] == this.state.countryInfo.name
                    ? correctAnswerClasses.join(" ")
                    : "option"
                }
                onClick={this.checkAnswer.bind(this, this.state.options[3], 3)}
              >
                <span className="optionLetter">D</span>
                {this.state.options[3]}
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.chosenOption == 3 &&
                    this.state.options[3] != this.state.countryInfo.name
                      ? "showIcon material-icons"
                      : "hideIcon material-icons"
                  }
                >
                  cancel
                </span>
                <span
                  className={
                    this.state.checkedAnswer &&
                    this.state.countryInfo.name == this.state.options[3]
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
    ) : (
      <p>Loading</p>
    );
  }
}

export default Question;
