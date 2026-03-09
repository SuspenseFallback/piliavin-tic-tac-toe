import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tic_tac_toe, set_tic_tac_toe] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [active, set_active] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  const [score, set_score] = useState({ x: 0, o: 0 });
  const [modal, set_modal] = useState(false);
  const [answer, set_answer] = useState("");
  const [correct_answer, set_correct_answer] = useState("");
  const [correct, set_correct] = useState(false);
  const [answered, set_answered] = useState(false);

  const [x_turn, set_x_turn] = useState(true);
  const [over, set_over] = useState(false);
  const [question_index, set_question_index] = useState(0);
  const [shuffled_answers, set_shuffled_answers] = useState([]);
  const [row, set_row] = useState(false);
  const [column, set_column] = useState(false);

  const questions = [
    "What kind of experiment is Piliavin et al?",
    "What year was Piliavin et al conducted?",
    "What kind of observation occured in Piliavin et al?",
    "How many participants were in Piliavin et al?",
    "At what times did the study occur?",
    "Where did the study take place?",
    "How long was the train ride?",
    "How many students were confederates per trial?",
    "How many male students were confederates?",
    "How many female students were confederates?",
    "Where were the student confederates from?",
    "What were the two conditions in Piliavin?",
    "What percentage of times were the drunk person helped?",
    "What percentage of times were the ill person helped?",
    "What percentage of first helpers were male?",
    "What percentage of first helpers were white?",
  ];

  const answers = [
    ["Field", "Lab", "Naturalistic", "Longitudinal"],
    ["1969", "1968", "1957", "1959"],
    ["Covert", "Overt", "Blind", "Fragile"],
    ["4450", "4550", "5450", "5540"],
    ["11 am - 3 pm", "3 pm - 7 pm", "7 am - 11 am", "7 pm - 11 pm"],
    ["New York Subway", "Chicago Subway", "Singapore Subway", "New York Buses"],
    ["7.5 minutes", "7 minutes", "6.5 minutes", "6 minutes"],
    ["4", "3", "2", "1"],
    ["2", "3", "1", "4"],
    ["2", "3", "1", "4"],
    [
      "Columbia University",
      "Yale University",
      "Harvard University",
      "The local high school",
    ],
    ["Drunk and ill", "Drunk and high", "High and ill", "Drunk and dead"],
    ["50%", "55%", "20%", "30%"],
    ["95%", "90%", "75%", "60%"],
    ["90%", "50%", "25%", "60%"],
    ["64%", "62%", "63%", "65%"],
  ];

  useEffect(() => {
    document.title = "Psychology Tic Tac Toe";
  }, []);

  function shuffle(array) {
    let new_array = [...array];
    let currentIndex = new_array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [new_array[currentIndex], new_array[randomIndex]] = [
        new_array[randomIndex],
        new_array[currentIndex],
      ];
    }

    return new_array;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const show_question = () => {
    const random = getRandomInt(questions.length);
    set_question_index(random);
    set_correct_answer(answers[random][0]);
    set_shuffled_answers(shuffle(answers[random]));

    set_modal(true);
  };

  const close_question = () => {
    set_question_index(0);
    set_answer("");
    set_answered(false);
    set_correct_answer("");
    set_modal(false);
    set_row(false);
    set_column(false);
  };

  const answer_question = () => {
    set_answered(true);

    if (answer === correct_answer) {
      set_correct(true);
      if (x_turn) {
        addX(row, column);
      } else {
        addO(row, column);
      }

      const is_over = check_if_done();
      if (!is_over) {
        set_x_turn(!x_turn);
      } else {
        if (is_over === "draw") {
          set_score({ x: score.x + 0.5, o: score.o + 0.5 });
        } else if (x_turn) {
          set_score({ x: score.x + 1, o: score.o });
        } else {
          set_score({ x: score.x, o: score.o + 1 });
        }
      }
    } else {
      set_correct(false);
      set_x_turn(!x_turn);
    }
  };

  const addTurn = (r, c) => {
    if (!over) {
      if (tic_tac_toe[r][c] !== "") {
        return false;
      }

      set_row(r);
      set_column(c);

      show_question();
    }
  };

  const addX = (row, column) => {
    const new_board = [...tic_tac_toe];
    new_board[row][column] = "X";

    set_tic_tac_toe(new_board);
  };

  const addO = (row, column) => {
    const new_board = [...tic_tac_toe];
    new_board[row][column] = "O";

    set_tic_tac_toe(new_board);
  };

  const reset = () => {
    set_tic_tac_toe([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    set_active([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
    set_x_turn(true);
    set_over(false);
  };

  const check_if_done = () => {
    // for Xs

    if (
      tic_tac_toe[0][0] === "X" &&
      tic_tac_toe[0][1] === "X" &&
      tic_tac_toe[0][2] === "X"
    ) {
      set_active([
        [true, true, true],
        [false, false, false],
        [false, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[1][0] === "X" &&
      tic_tac_toe[1][1] === "X" &&
      tic_tac_toe[1][2] === "X"
    ) {
      set_active([
        [false, false, false],
        [true, true, true],
        [false, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[2][0] === "X" &&
      tic_tac_toe[2][1] === "X" &&
      tic_tac_toe[2][2] === "X"
    ) {
      set_active([
        [false, false, false],
        [false, false, false],
        [true, true, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][0] === "X" &&
      tic_tac_toe[1][0] === "X" &&
      tic_tac_toe[2][0] === "X"
    ) {
      set_active([
        [true, false, false],
        [true, false, false],
        [true, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][1] === "X" &&
      tic_tac_toe[1][1] === "X" &&
      tic_tac_toe[2][1] === "X"
    ) {
      set_active([
        [false, true, false],
        [false, true, false],
        [false, true, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][2] === "X" &&
      tic_tac_toe[1][2] === "X" &&
      tic_tac_toe[2][2] === "X"
    ) {
      set_active([
        [false, false, true],
        [false, false, true],
        [false, false, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][0] === "X" &&
      tic_tac_toe[1][1] === "X" &&
      tic_tac_toe[2][2] === "X"
    ) {
      set_active([
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][2] === "X" &&
      tic_tac_toe[1][1] === "X" &&
      tic_tac_toe[2][0] === "X"
    ) {
      set_active([
        [false, false, true],
        [false, true, false],
        [true, false, false],
      ]);
      set_over(true);
      return true;
    }

    // for Os

    if (
      tic_tac_toe[0][0] === "O" &&
      tic_tac_toe[0][1] === "O" &&
      tic_tac_toe[0][2] === "O"
    ) {
      set_active([
        [true, true, true],
        [false, false, false],
        [false, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[1][0] === "O" &&
      tic_tac_toe[1][1] === "O" &&
      tic_tac_toe[1][2] === "O"
    ) {
      set_active([
        [false, false, false],
        [true, true, true],
        [false, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[2][0] === "O" &&
      tic_tac_toe[2][1] === "O" &&
      tic_tac_toe[2][2] === "O"
    ) {
      set_active([
        [false, false, false],
        [false, false, false],
        [true, true, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][0] === "O" &&
      tic_tac_toe[1][0] === "O" &&
      tic_tac_toe[2][0] === "O"
    ) {
      set_active([
        [true, false, false],
        [true, false, false],
        [true, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][1] === "O" &&
      tic_tac_toe[1][1] === "O" &&
      tic_tac_toe[2][1] === "O"
    ) {
      set_active([
        [false, true, false],
        [false, true, false],
        [false, true, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][2] === "O" &&
      tic_tac_toe[1][2] === "O" &&
      tic_tac_toe[2][2] === "O"
    ) {
      set_active([
        [false, false, true],
        [false, false, true],
        [false, false, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][0] === "O" &&
      tic_tac_toe[1][1] === "O" &&
      tic_tac_toe[2][2] === "O"
    ) {
      set_active([
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][2] === "O" &&
      tic_tac_toe[1][1] === "O" &&
      tic_tac_toe[2][0] === "O"
    ) {
      set_active([
        [false, false, true],
        [false, true, false],
        [true, false, false],
      ]);
      set_over(true);
      return true;
    }

    if (
      tic_tac_toe[0][0] &&
      tic_tac_toe[0][1] &&
      tic_tac_toe[0][2] &&
      tic_tac_toe[1][0] &&
      tic_tac_toe[1][1] &&
      tic_tac_toe[1][2] &&
      tic_tac_toe[2][0] &&
      tic_tac_toe[2][1] &&
      tic_tac_toe[2][2]
    ) {
      set_active([
        [true, true, true],
        [true, true, true],
        [true, true, true],
      ]);
      set_over(true);
      return "draw";
    }

    return false;
  };

  return (
    <div className="page">
      <div
        className={"modal-overlay" + (modal ? "" : " hidden")}
        onClick={close_question}
      ></div>
      <div className={"modal" + (modal ? "" : " hidden")}>
        <div className="modal-container">
          <div className="question-container">
            <span className="close" onClick={close_question}>
              x
            </span>
            <p className="question">{questions[question_index]}</p>
            <div className="answers">
              {correct_answer
                ? shuffled_answers.map((card_answer, index) => {
                    return (
                      <div className="answer">
                        <input
                          type="radio"
                          name="answer"
                          id={"answer" + index}
                          onClick={() => set_answer(card_answer)}
                          className="answer-input"
                        />
                        <label
                          htmlFor={"answer" + index}
                          onClick={() => set_answer(card_answer)}
                        >
                          {card_answer}
                        </label>
                      </div>
                    );
                  })
                : null}
              <button
                className="submit"
                disabled={!answer}
                onClick={answer_question}
              >
                Submit
              </button>
            </div>
            <div className={"answer-container" + (answered ? "" : " hidden")}>
              <span className="close" onClick={close_question}>
                x
              </span>
              <p className="big">{correct ? "Correct!" : "Wrong!"}</p>
              <p className="correct-answer">Correct answer: {correct_answer}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="game-container">
        <div className="container">
          <div className="row row-1">
            <div
              className={"cell cell-1 col-1" + (active[0][0] ? " active" : "")}
              onClick={() => addTurn(0, 0)}
            >
              <p className="sign">{tic_tac_toe[0][0]}</p>
            </div>
            <div
              className={"cell cell-2 col-2" + (active[0][1] ? " active" : "")}
              onClick={() => addTurn(0, 1)}
            >
              <p className="sign">{tic_tac_toe[0][1]}</p>
            </div>
            <div
              className={"cell cell-3 col-3" + (active[0][2] ? " active" : "")}
              onClick={() => addTurn(0, 2)}
            >
              <p className="sign">{tic_tac_toe[0][2]}</p>
            </div>
          </div>
          <div className="row row-2">
            <div
              className={"cell cell-4 col-1" + (active[1][0] ? " active" : "")}
              onClick={() => addTurn(1, 0)}
            >
              <p className="sign">{tic_tac_toe[1][0]}</p>
            </div>
            <div
              className={"cell cell-5 col-2" + (active[1][1] ? " active" : "")}
              onClick={() => addTurn(1, 1)}
            >
              <p className="sign">{tic_tac_toe[1][1]}</p>
            </div>
            <div
              className={"cell cell-6 col-3" + (active[1][2] ? " active" : "")}
              onClick={() => addTurn(1, 2)}
            >
              <p className="sign">{tic_tac_toe[1][2]}</p>
            </div>
          </div>
          <div className="row row-3">
            <div
              className={"cell cell-7 col-1" + (active[2][0] ? " active" : "")}
              onClick={() => addTurn(2, 0)}
            >
              <p className="sign">{tic_tac_toe[2][0]}</p>
            </div>
            <div
              className={"cell cell-8 col-2" + (active[2][1] ? " active" : "")}
              onClick={() => addTurn(2, 1)}
            >
              <p className="sign">{tic_tac_toe[2][1]}</p>
            </div>
            <div
              className={"cell cell-9 col-3" + (active[2][2] ? " active" : "")}
              onClick={() => addTurn(2, 2)}
            >
              <p className="sign">{tic_tac_toe[2][2]}</p>
            </div>
          </div>
        </div>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="score-container">
        <p className="title">Scores</p>
        <p className="x">X: {score.x}</p>
        <p className="o">O: {score.o}</p>
      </div>
    </div>
  );
}

export default App;
