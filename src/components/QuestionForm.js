import React, { useEffect, useState } from "react";


function QuestionForm({ questions, setQuestions }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers:[],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    
  
    if (name.startsWith('answer')) {
      // Update the answers array
      const index = parseInt(name.slice(-1), 10); // Extract the index from the input name
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index - 1] = value; // Subtract 1 because array indices are zero-based
  
      setFormData({
        ...formData,
        answers: updatedAnswers,
      });

      
    } else {
      // Update other form fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }
  

  function handleSubmit(event) {
    event.preventDefault();

    
    
    
    fetch("http://localhost:4000/questions",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(formData)
    })
      .then(r=> r.json())
      .then(data=> {
        setQuestions(questions.push(data))
      }
      )
     }



  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answers[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answers[1]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answers[2]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answers[3]}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answers[0]}</option>
            <option value="1">{formData.answers[1]}</option>
            <option value="2">{formData.answers[2]}</option>
            <option value="3">{formData.answers[3]}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
