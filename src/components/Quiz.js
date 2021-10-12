import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import Question from './Question';

const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

const App=({username}) =>{
  const [seconds, setSeconds] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() =>{
    Axios.get(API_URL)
      .then(res => res.data)
      .then(data => {
        const questions = data.results.map((question) => ({
          ...question,
          answers:[question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
        }))
        setQuestions(questions)
      });
      const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1 );
        return () => clearInterval(interval);
      }, 1000);

    
  },[])




  const handleAnswer = (answer) => {
    if(!showAnswers){
      if(answer === questions[currentIndex].correct_answer){
        setScore(score+1);
      }
    }
    

    setShowAnswers(true);
    
  }

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex+1);
    setShowAnswers(false);
  }


  return ( questions.length > 0 ? (

    <div className="container">
      UserName: {username}<br/>
      Timer: {seconds}
      {currentIndex >= questions.length ? (
      <h1>Game Ended, Your Score is {score}</h1>): (<Question  handleAnswer={handleAnswer}
        showAnswers={showAnswers}
        handleNextQuestion={handleNextQuestion}
        data={questions[currentIndex]}/>)}
      
    </div>

  ) : <div className="container">Loading...</div>
    
  );
}

export default App;