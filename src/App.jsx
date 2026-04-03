import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { questions, options } from "./data/enneagram";
import { Starfield } from "./components/Starfield";
import { IntroScreen } from "./components/IntroScreen";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";

export default function App() {
  const [screen,   setScreen]   = useState("intro");
  const [current,  setCurrent]  = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [result,   setResult]   = useState(null);
  const [selected, setSelected] = useState(null);

  const progress = (current / questions.length) * 100;

  const handleAnswer = (val) => {
    setSelected(val);
    setTimeout(() => {
      const newAnswers = {
        ...answers,
        [questions[current].id]: { value: val, type: questions[current].type },
      };
      setAnswers(newAnswers);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        calcResult(newAnswers);
      }
    }, 450);
  };

  const calcResult = (ans) => {
    const scores = {};
    for (let i = 1; i <= 9; i++) scores[i] = 0;
    Object.values(ans).forEach(({ value, type }) => { scores[type] += value; });
    const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    setResult({ type: parseInt(topType), scores });
    setScreen("result");
  };

  const restart = () => {
    setCurrent(0); setAnswers({}); setResult(null); setSelected(null);
    setScreen("intro");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col items-center justify-center">
      <Starfield />

      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {screen === "intro" && (
            <IntroScreen key="intro" onStart={() => setScreen("quiz")} />
          )}
          {screen === "quiz" && (
            <QuizScreen
              key={`quiz-${current}`}
              question={questions[current]}
              options={options}
              current={current}
              total={questions.length}
              progress={progress}
              selected={selected}
              onAnswer={handleAnswer}
            />
          )}
          {screen === "result" && result && (
            <ResultScreen key="result" result={result} onRestart={restart} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
