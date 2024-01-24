import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {

  function handleDelete(e) {
    console.log(e.target.id)
    
    const newQuestions = questions.filter(question => question.id != e.target.id)
    

    fetch(`http://localhost:4000/questions/${e.target.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
    })
      .then((response) => {
      if (response.ok) {
        console.log('Item successfully deleted');
        // Handle any additional logic after successful deletion
        setQuestions(newQuestions)
      } else {
        console.error('Failed to delete item. Status:', response.status);
        // Handle errors, such as displaying an error message to the user
      }
      })
      .catch((error) => {
        console.error('Error:', error);
      // Handle network errors or other issues
    });
  }

  function handleChange(e) {

    const questionId = e.target.parentElement.className

    //const selectValue = e.target.selectedOptions[0].text
    

    const newQuestions = questions.map((question) => {

      if(questionId == question.id){
        question.correctIndex = e.target.value


        fetch(`http://localhost:4000/questions/${question.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "correctIndex": parseInt(e.target.value),
          }),
        })
          .then((r) => r.json())
          .then((upDatedQuestion) => console.log(upDatedQuestion));

      }
      
    })

  }

  return (
    <section>
      <h1>Quiz Questions</h1>
        <ul>{
          questions.map(question=>(<QuestionItem 
            key={question.id} 
            question={question}
            onDelete={handleDelete}
            onChange={handleChange}
          />))
          }
        </ul>
    </section>
  );
}


export default QuestionList;
