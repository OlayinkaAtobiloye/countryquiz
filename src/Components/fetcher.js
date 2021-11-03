import axios from "axios";
import React, { Component } from "react";
import Question from "./Question/Question";

class Fetcher extends Component {
  state = {
    countryInfo: "Fetching",
    questionType: "capital",
    options: [],
    response: null,
  };

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
        this.setState(() => {
          return {
            countryInfo: countryInfo,
            questionType: questionType,
            response: response.data,
          };
        });
      });
  }

  render() {
    if (this.state.response) {
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
      options.push(option1, option2, option3, this.state.countryInfo.name);
      options = this.shuffle(options);
    }

    return this.state.response ? (
      this.state.questionType == "capital" ? (
        <Question
          question={`${this.state.countryInfo.capital} is the capital of`}
          options={options}
          questionType={this.state.questionType}
          countryInfo={this.state.countryInfo}
          currentScore={this.props.currentScore}
          totalQuestion={this.props.totalQuestion}
        />
      ) : (
        <Question
          question={`This flag belongs to what country?`}
          options={options}
          questionType={this.state.questionType}
          countryInfo={this.state.countryInfo}
          currentScore={this.props.currentScore}
          totalQuestion={this.props.totalQuestion}
        />
      )
    ) : (
      <p>Loading</p>
    );
  }
}

export default Fetcher;
