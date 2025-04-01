import { useState } from "react";
import axios from "axios";

/**
 * UserPreferences component renders a survey for users to select their PC build preferences.
 * It dynamically navigates through questions based on user choices and collects answers.
 *
 * @component
 *
 * @example
 * return (
 *   <UserPreferences />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @typedef {Object} Question
 * @property {number|string} id - The unique identifier for the question.
 * @property {string} text - The question text.
 * @property {Array<Option>} options - The available options for the question.
 *
 * @typedef {Object} Option
 * @property {string} text - The option text.
 * @property {number|string} next - The id of the next question or "custom" for custom input.
 * @property {number} [min] - The minimum budget for custom input.
 *
 * @typedef {Object} Answer
 * @property {number|string} questionId - The id of the answered question.
 * @property {string} answer - The selected answer text.
 *
 * @typedef {Object} Recommendation
 * @property {string} cpu - The recommended CPU.
 * @property {string} gpu - The recommended GPU.
 * @property {string} ram - The recommended RAM.
 * @property {string} storage - The recommended storage.
 * @property {string} psu - The recommended PSU.
 * @property {number} total_cost - The total cost of the recommended build.
 *
 * @state {number} currentQuestion - The id of the current question being displayed.
 * @state {Array<Answer>} answers - The list of answers selected by the user.
 * @state {Recommendation|null} recommendation - The recommended PC build based on user answers.
 * @state {string|null} error - The error message if the recommendation fetch fails.
 * @state {string} customBudget - The custom budget input by the user.
 * @state {boolean} showCustomInput - Whether to show the custom budget input field.
 * @state {number} minBudget - The minimum budget for the custom input.
 *
 * @function handleOptionClick - Handles the click event on an option button.
 * @param {Option} option - The selected option.
 *
 * @function handleCustomBudgetChange - Handles the change event on the custom budget input field.
 * @param {Event} event - The change event.
 *
 * @function handleCustomBudgetSubmit - Handles the submit event for the custom budget input field.
 * @param {Event} event - The submit event.
 *
 * @function handleReset - Resets the survey to its initial state.
 *
 * @function handleSubmit - Submits the answers and fetches the recommendation from the server.
 */
export default function UserPreferences() {
  // Define the questions array with dynamic connections after budget
  const questions = [
    {
      id: 1,
      text: "What are you looking for?",
      options: [
        { text: "Budget PC Builds", next: 2 },
        { text: "Gaming PC Builds", next: 3 },
        { text: "Workstation PC Builds", next: 4 },
        { text: "Professional & Enterprise", next: 5 },
        // { text: "Enthusiast & Niche Builds", next: 6 },
      ],
    },
    {
      id: 2,
      text: "Budget PC Builds?",
      options: [
        { text: "Student PC", next: 7 },
        { text: "Office Workstation", next: 8 },
        { text: "Casual Home PC", next: 9 },
        { text: "Low-Cost Gaming PC", next: 10 },
      ],
    },
    {
      id: 3,
      text: "Gaming PC Builds?",
      options: [
        { text: "Entry-Level Gaming PC", next: 11 },
        { text: "Mid-Range Gaming PC", next: 12 },
        { text: "High-End Gaming PC", next: 13 },
        { text: "Competitive eSports PC", next: 14 },
        { text: "Streaming & Gaming Hybrid PC", next: 15 },
      ],
    },
    {
      id: 4,
      text: "Workstation PC Builds?",
      options: [
        { text: "Video Editing Workstation", next: 16 },
        { text: "3D Rendering & Animation PC", next: 17 },
        { text: "CAD & Engineering Workstation", next: 18 },
        { text: "Music Production Workstation", next: 19 },
        { text: "AI & Machine Learning Workstation", next: 20 },
        { text: "Software Development Workstation", next: 21 },
      ],
    },
    {
      id: 5,
      text: "Professional & Enterprise Use?",
      options: [
        { text: "Business Workstation", next: 22 },
        { text: "Financial Trading PC", next: 23 },
        { text: "Server & Home Lab PC", next: 24 },
        { text: "Medical & Scientific Computing PC", next: 25 },
      ],
    },
    {
      id: 6,
      text: "Enthusiast & Niche Builds?",
      options: [
        { text: "Mini ITX Compact PC", next: 26 },
        { text: "Energy-Efficient PC", next: 27 },
      ],
    },
    // Budget questions
    {
      id: 7,
      text: "Budget?",
      options: [
        { text: "₹10,100 - ₹30,000", next: 33 },
        { text: "₹30,000 - ₹35,000", next: 33 },
        { text: "Custom", next: "custom", min: 10100 },
      ],
    },
    {
      id: 8,
      text: "Budget?",
      options: [
        { text: "₹36,000 - ₹40,000", next: 33 },
        { text: "₹40,000 - ₹45,000", next: 33 },
        { text: "Custom", next: "custom", min: 36000 },
      ],
    },
    {
      id: 9,
      text: "Budget?",
      options: [
        { text: "₹32,000 - ₹38,000", next: 33 },
        { text: "₹38,000 - ₹45,000", next: 33 },
        { text: "Custom", next: "custom", min: 32000 },
      ],
    },
    {
      id: 10,
      text: "Budget?",
      options: [
        { text: "₹46,500 - ₹49,000", next: 33 },
        { text: "₹49,000 - ₹55,000", next: 33 },
        { text: "Custom", next: "custom", min: 46500 },
      ],
    },
    {
      id: 11,
      text: "Budget?",
      options: [
        { text: "₹55,000 - ₹65,000", next: 33 },
        { text: "₹65,000 - ₹70,000", next: 33 },
        { text: "Custom", next: "custom", min: 55000 },
      ],
    },
    {
      id: 12,
      text: "Budget?",
      options: [
        { text: "₹75,000 - ₹100,000", next: 33 },
        { text: "₹100,000 - ₹120,000", next: 33 },
        { text: "Custom", next: "custom", min: 75000 },
      ],
    },
    {
      id: 13,
      text: "Budget?",
      options: [
        { text: "₹130,000 - ₹250,000", next: 33 },
        { text: "₹250,000 - ₹400,000", next: 33 },
        { text: "Custom", next: "custom", min: 130000 },
      ],
    },
    {
      id: 14,
      text: "Budget?",
      options: [
        { text: "₹85,000 - ₹250,000", next: 33 },
        { text: "₹250,000 - ₹380,000", next: 33 },
        { text: "Custom", next: "custom", min: 85000 },
      ],
    },
    {
      id: 15,
      text: "Budget?",
      options: [
        { text: "₹180,000 - ₹250,000", next: 33 },
        { text: "₹250,000 - ₹400,000", next: 33 },
        { text: "Custom", next: "custom", min: 180000 },
      ],
    },
    {
      id: 16,
      text: "Budget?",
      options: [
        { text: "₹550,000 - ₹700,000", next: 33 },
        { text: "₹700,000 - ₹900,000", next: 33 },
        { text: "Custom", next: "custom", min: 550000 },
      ],
    },
    {
      id: 17,
      text: "Budget?",
      options: [
        { text: "₹600,000 - ₹800,000", next: 33 },
        { text: "₹800,000 - ₹1,400,000", next: 33 },
        { text: "Custom", next: "custom", min: 600000 },
      ],
    },
    {
      id: 18,
      text: "Budget?",
      options: [
        { text: "₹550,000 - ₹750,000", next: 33 },
        { text: "₹750,000 - ₹1,300,000", next: 33 },
        { text: "Custom", next: "custom", min: 550000 },
      ],
    },
    {
      id: 19,
      text: "Budget?",
      options: [
        { text: "₹180,000 - ₹220,000", next: 33 },
        { text: "₹220,000 - ₹450,000", next: 33 },
        { text: "Custom", next: "custom", min: 180000 },
      ],
    },
    {
      id: 20,
      text: "Budget?",
      options: [
        { text: "₹1,600,000 - ₹1,800,000", next: 33 },
        { text: "₹1,800,000 - ₹2,000,000", next: 33 },
        { text: "Custom", next: "custom", min: 1600000 },
      ],
    },
    {
      id: 21,
      text: "Budget?",
      options: [
        { text: "₹400,000 - ₹540,000", next: 33 },
        { text: "₹540,000 - ₹600,000", next: 33 },
        { text: "Custom", next: "custom", min: 400000 },
      ],
    },
    {
      id: 22,
      text: "Budget?",
      options: [
        { text: "₹65,000 - ₹100,000", next: 33 },
        { text: "₹100,000 - ₹200,000", next: 33 },
        { text: "Custom", next: "custom", min: 65000 },
      ],
    },
    {
      id: 23,
      text: "Budget?",
      options: [
        { text: "₹120,000 - ₹200,000", next: 33 },
        { text: "₹200,000 - ₹500,000", next: 33 },
        { text: "Custom", next: "custom", min: 120000 },
      ],
    },
    {
      id: 24,
      text: "Budget?",
      options: [
        { text: "₹100,000 - ₹200,000", next: 33 },
        { text: "₹200,000 - ₹500,000", next: 33 },
        { text: "Custom", next: "custom", min: 100000 },
      ],
    },
    {
      id: 25,
      text: "Budget?",
      options: [
        { text: "₹120,000 - ₹200,000", next: 33 },
        { text: "₹200,000 - ₹500,000", next: 33 },
        { text: "Custom", next: "custom", min: 120000 },
      ],
    },
    {
      id: 26,
      text: "Budget?",
      options: [
        { text: "₹180,000 - ₹320,000", next: 33 },
        { text: "₹320,000 - ₹450,000", next: 33 },
        { text: "Custom", next: "custom", min: 180000 },
      ],
    },
    {
      id: 27,
      text: "Budget?",
      options: [
        { text: "₹1,600,000 - ₹1,800,000", next: 33 },
        { text: "₹1,800,000 - ₹2,000,000", next: 33 },
        { text: "Custom", next: "custom", min: 1600000 },
      ],
    },
    {
      id: 33,
      text: "Thank you! We'll recommend a PC.",
      options: [],
    },
    {
      id: "custom",
      text: "Enter your custom budget:",
      options: [],
    },
  ];

  // Initialize state hooks
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [customBudget, setCustomBudget] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [minBudget, setMinBudget] = useState(0);
  const [questionHistory, setQuestionHistory] = useState([]); // New state for question history

  const handleOptionClick = (option) => {
    if (option.next === "custom") {
      const min = questions
        .find((q) => q.id === currentQuestion)
        .options.find((opt) => opt.next === "custom").min;
      setMinBudget(min);
      setShowCustomInput(true);
    } else {
      // Remove answers for the current question and subsequent questions
      const updatedAnswers = answers.filter(
        (a) => a.questionId < currentQuestion
      );

      // Add the new answer for the current question
      updatedAnswers.push({ questionId: currentQuestion, answer: option.text });

      setAnswers(updatedAnswers);
      setQuestionHistory([...questionHistory, currentQuestion]); // Update history
      setCurrentQuestion(option.next || 33);
    }
  };

  const handleCustomBudgetChange = (event) => {
    setCustomBudget(event.target.value);
  };

  const handleCustomBudgetSubmit = (event) => {
    if (event.key === "Enter") {
      const inputBudget = parseFloat(customBudget);
      if (inputBudget >= minBudget) {
        // Remove answers for the current question and subsequent questions
        const updatedAnswers = answers.filter(
          (a) => a.questionId < currentQuestion
        );

        // Add the new custom budget answer for the current question
        updatedAnswers.push({
          questionId: currentQuestion,
          answer: `Custom: ₹${inputBudget}`,
        });

        setAnswers(updatedAnswers);
        setQuestionHistory([...questionHistory, currentQuestion]); // Update history
        setCurrentQuestion(33);
        setShowCustomInput(false);
        setCustomBudget("");
      } else {
        alert(`Budget should be at least ₹${minBudget}`);
      }
    }
  };

  // Reset the survey to its initial state
  const handleReset = () => {
    setCurrentQuestion(1);
    setAnswers([]);
    setRecommendation(null);
    setError(null);
    setCustomBudget("");
    setShowCustomInput(false);
    setMinBudget(0);
    setQuestionHistory([]); // Reset history
  };

  // Submit the answers and fetch the recommendation from the server
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/recommend_build/",
        { answers }
      );
      setRecommendation(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching recommendation:", err);
      setError(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again."
      );
      setRecommendation(null);
    }
  };

  // Handle going back to the previous question
  const handleGoBack = () => {
    if (questionHistory.length > 0) {
      const previousQuestion = questionHistory.pop();

      // Remove answers for the current question and subsequent questions
      const updatedAnswers = answers.filter(
        (a) => a.questionId < previousQuestion
      );

      setAnswers(updatedAnswers);
      setQuestionHistory([...questionHistory]);
      setCurrentQuestion(previousQuestion);
      setError(null); // Clear error message
      setRecommendation(null); // Clear recommendation
    }
  };

  const question = questions.find((q) => q.id === currentQuestion);

  return (
    <section id="uqa-section">
      <div className="flex items-center justify-center min-h-screen text-white p-6">
        <div className="flex flex-row justify-between">
          <div className="p-4 flex mt-30 items-center justify-center">
            <img
              src="/pctower.png"
              alt="PC Tower"
              className="h-150 w-150 object-contain scale-x-[-1] brightness-150"
            />
          </div>
          <div className="w-30"></div>
          <div className="p-6 flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl pb-10 font-bold mb-4">{question.text}</h2>
            <div className="flex flex-col space-y-5">
              {question.options.map((option, index) => (
                <button
                  id="options"
                  key={index}
                  className="w-75 h-15 text-lg font-bold rounded-4xl px-5 transition leading-tight"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
            {showCustomInput && (
              <div className="mt-4">
                <input
                  type="number"
                  value={customBudget}
                  onChange={handleCustomBudgetChange}
                  onKeyPress={handleCustomBudgetSubmit}
                  className="p-2 border w-75 h-15 border-gray-300 rounded-lg"
                  placeholder={`Enter your custom budget (minimum ₹${minBudget})`}
                />
              </div>
            )}
            {currentQuestion > 1 && (
              <div className="flex space-x-4 mt-6">
                <button
                  className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                  onClick={handleReset}
                >
                  Reset
                </button>
                {questionHistory.length > 0 && (
                  <button
                    className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    onClick={handleGoBack}
                  >
                    Go Back
                  </button>
                )}
                {currentQuestion === 33 && (
                  <button
                    className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
            {error && (
              <div className="mt-6 p-4 bg-gray-800 text-white rounded-xl">
                <h3 className="text-xl font-bold">Error:</h3>
                <p>{error}</p>
              </div>
            )}
            {recommendation && (
              <div className="mt-10 p-6 bg-gray-800 rounded-xl text-left">
                <h3 className="text-2xl font-bold">Recommended PC Build:</h3>
                <div className="build-component">
                  <p>
                    <strong>CPU:</strong> {recommendation.cpu}
                  </p>
                </div>
                <div className="build-component">
                  <p>
                    <strong>Motherboard:</strong> {recommendation.motherboard}
                  </p>
                </div>
                <div className="build-component">
                  <p>
                    <strong>GPU:</strong> {recommendation.gpu}
                  </p>
                </div>
                <div className="build-component">
                  <p>
                    <strong>RAM:</strong> {recommendation.ram}
                  </p>
                </div>
                <div className="build-component">
                  <p>
                    <strong>Storage:</strong> {recommendation.storage}
                  </p>
                </div>
                <div className="build-component">
                  <p>
                    <strong>PSU:</strong> {recommendation.psu}
                  </p>
                </div>
                <div className="total-cost mt-4 text-xl font-bold">
                  <p>
                    <strong>Total Cost:</strong> ₹{recommendation.total_cost}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
