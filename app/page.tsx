"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

const BIRTHDAY_SCENES = [
  {
    id: "lotr-2",
    url: "https://www.youtube.com/watch?v=CiRu_W9tzM8",
    movie: "The Lord of the Rings: The Fellowship of the Ring (2001)",
    options: [
      "The Lord of the Rings: The Fellowship of the Ring (2001)",
      "The Hobbit: An Unexpected Journey (2012)",
      "The Chronicles of Narnia (2005)",
      "Game of Thrones (2011)",
    ],
  },
  {
    id: "toy-story",
    url: "https://www.youtube.com/watch?v=-i64H12E5gc",
    movie: "Toy Story (1995)",
    options: [
      "Toy Story (1995)",
      "Monsters Inc. (2001)",
      "Finding Nemo (2003)",
      "The Incredibles (2004)",
    ],
  },
  {
    id: "hp",
    url: "https://www.youtube.com/watch?v=grp1hxm5bQc",
    movie: "Harry Potter and the Sorcerer's Stone (2001)",
    options: [
      "Harry Potter and the Sorcerer's Stone (2001)",
      "The Chronicles of Narnia (2005)",
      "Percy Jackson (2010)",
      "Eragon (2006)",
    ],
  },
  {
    id: "sixteen-candles",
    url: "https://www.youtube.com/watch?v=qmGwPYdstQQ",
    movie: "Sixteen Candles (1984)",
    options: [
      "Sixteen Candles (1984)",
      "The Breakfast Club (1985)",
      "Pretty in Pink (1986)",
      "Ferris Bueller's Day Off (1986)",
    ],
  },
  {
    id: "the-game",
    url: "https://www.youtube.com/watch?v=q3T3shBaGEk",
    movie: "The Game (1997)",
    options: [
      "The Game (1997)",
      "Fight Club (1999)",
      "The Matrix (1999)",
      "Inception (2010)",
    ],
  },
  {
    id: "godfather-2",
    url: "https://www.youtube.com/watch?v=mdvjRI25how",
    movie: "The Godfather: Part II (1974)",
    options: [
      "The Godfather: Part II (1974)",
      "Goodfellas (1990)",
      "Scarface (1983)",
      "The Departed (2006)",
    ],
  },
  {
    id: "schlinders-list",
    url: "https://www.youtube.com/watch?v=xpxWq-hhoxE",
    movie: "Schindler's List (1993)",
    options: [
      "Schindler's List (1993)",
      "The Pianist (2002)",
      "Life is Beautiful (1997)",
      "The Boy in the Striped Pyjamas (2008)",
    ],
  },
] as const;

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle options when question changes
    const options = [...BIRTHDAY_SCENES[currentQuestion].options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  }, [currentQuestion]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === BIRTHDAY_SCENES[currentQuestion].movie) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < BIRTHDAY_SCENES.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
        triggerConfetti();
      }
    }, 1000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  if (showScore) {
    const percentage = Math.round((score / BIRTHDAY_SCENES.length) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 p-4">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            ¡Feliz Cumpleaños Araceli! 🎉
          </h1>
          <p className="text-2xl mb-4 text-gray-800">
            Tu puntuación: {score}/{BIRTHDAY_SCENES.length} ({percentage}%)
          </p>
          <p className="text-xl mb-8 text-gray-700">
            {score === BIRTHDAY_SCENES.length
              ? "Cuando nos veamos te llevo el regalito"
              : "Te quedas sin regalo"}
          </p>
          <button
            onClick={resetQuiz}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Tenes que adivinar a que peli pertenece el vide Arito 🎬, si no haces
          100% te quedas sin regalo
        </h1>

        <div className="mb-6">
          <p className="text-center text-gray-600 mb-4">
            Pregunta {currentQuestion + 1} de {BIRTHDAY_SCENES.length}
          </p>

          <div className="aspect-w-16 aspect-h-9 mb-6 relative">
            <iframe
              src={
                BIRTHDAY_SCENES[currentQuestion].url.replace(
                  "watch?v=",
                  "embed/"
                ) + "?rel=0&version=3&controls=0&autoplay=1"
              }
              className="w-full h-64 rounded-lg"
            />
            <div className="absolute top-0 right-0 w-full h-15 bg-black"></div>
            <div className="absolute bottom-0 right-0 w-full h-15 bg-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shuffledOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg text-left transition-all duration-200 font-medium text-lg ${
                  selectedAnswer === null
                    ? "bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 text-purple-800"
                    : selectedAnswer === option
                    ? option === BIRTHDAY_SCENES[currentQuestion].movie
                      ? "bg-green-500 text-white border-2 border-green-600"
                      : "bg-red-500 text-white border-2 border-red-600"
                    : option === BIRTHDAY_SCENES[currentQuestion].movie
                    ? "bg-green-500 text-white border-2 border-green-600"
                    : "bg-gray-50 border-2 border-gray-200 text-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
