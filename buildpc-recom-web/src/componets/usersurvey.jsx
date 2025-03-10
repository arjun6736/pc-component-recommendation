import { useState } from "react";

export default function UserPreferences() {
  const questions = [
    {
      id: 1,
      text: "What is your primary use for this PC?",
      options: [
        { text: "Gaming", next: 6 },
        { text: "Workstation", next: 3 },
        { text: "Casual Use", next: 4 },
        { text: "Streaming", next: 5 },
      ],
    },
    {
      id: 3,
      text: "What type of workstation?",
      options: [
        { text: "Video Editing", next: 6 },
        { text: "Software Development", next: 6 },
        { text: "3D Rendering", next: 6 },
      ],
    },
    {
      id: 6,
      text: "What is your budget range?",
      options: [
        { text: "20000 - 25000", next: 7 },
        { text: "30000 - 40000", next: 7 },
        { text: "50000+", next: 7 },
      ],
    },
    {
      id: 7,
      text: "Thank you! We’ll recommend the best PC for you.",
      options: [],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);

  const handleOptionClick = (option) => {
    setAnswers([
      ...answers,
      { questionId: currentQuestion, answer: option.text },
    ]);
    if (option.next) {
      setCurrentQuestion(option.next);
    } else {
      console.log("User Answers:", answers);
    }
  };

  const question = questions.find((q) => q.id === currentQuestion);

  return (
    <section id="uqa-section">
      <div className="flex items-center justify-center min-h-screen  text-white p-6">
        <div className=" flex flex-row justify-between ">
          {/* Left Side - Image */}
          <div className=" p-4 flex mt-30 items-center justify-center ">
            <img
              src="/pctower.png"
              alt="PC Tower"
              className="h-150 w-150 object-contain scale-x-[-1] brightness-150"
            />
          </div>
          <div className="w-30"></div>
          {/* Right Side - Questions & Options */}
          <div className=" p-6 flex flex-col justify-center items-center text-center ">
            <h2 className="text-3xl pb-10 font-bold mb-4">{question.text}</h2>
            <div className="flex flex-col space-y-5">
              {question.options.map((option, index) => (
                <button
                  id="options"
                  key={index}
                  className="w-75 h-15 text-xl font-bold rounded-4xl hover:bg-red-800/90 transition"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
