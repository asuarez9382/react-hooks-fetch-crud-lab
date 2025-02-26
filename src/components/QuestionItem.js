import React from "react";

function QuestionItem({ question, onDelete, onChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label className={id}>
        Correct Answer:
        <select onChange={onChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={onDelete} id={id}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
