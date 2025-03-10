import { useState } from "react";
import axios from "axios";

export default function UserPreferences() {
  const questions = [
    {
      id: 1,
      text: "Main use for PC?",
      options: [
        { text: "Budget PC Builds", next: 4 },
        { text: "Gaming PC Builds", next: 2 },
        { text: "Workstation PC Builds", next: 3 },
        { text: "Professional & Enterprise Use", next: 4 },
        { text: "Enthusiast & Niche Builds", next: 3 },
        { text: "Streaming", next: 3 },
      ],
    },
    {
      id: 2,
      text: "Gaming type?",
      options: [
        { text: "Entry-Level Gaming", next: 4 },
        { text: "Mid-Range Gaming", next: 4 },
        { text: "High-End Gaming", next: 4 },
        { text: "Competitive eSports", next: 4 },
        { text: "VR-Ready Gaming", next: 4 },
        { text: "Streaming & Gaming Hybrid", next: 4 },
      ],
    },
    {
      id: 3,
      text: "Work type?",
      options: [
        { text: "Video Editing Workstation", next: 4 },
        { text: "3D Rendering & Animation", next: 4 },
        { text: "CAD & Engineering ", next: 4 },
        { text: "Music Production", next: 4 },
        { text: "AI & Machine Learning", next: 4 },
        { text: "Software Development", next: 4 },
      ],
    },
    {
      id: 1,
      text: "Budget?",
      options: [
        { text: "₹10,100 - ₹30,000 (Student PC)", next: 2 },
        { text: "₹30,000 - ₹35,000 (Student PC - Mid-Range)", next: 2 },
        { text: "₹35,000+ (Student PC - High-End)", next: 2 }
      ]
    },
    {
      id: 2,
      text: "Budget?",
      options: [
        { text: "₹36,000 - ₹40,000 (Office Workstation)", next: 3 },
        { text: "₹40,000 - ₹45,000 (Office Workstation - Mid-Range)", next: 3 },
        { text: "₹45,000+ (Office Workstation - High-End)", next: 3 }
      ]
    },
    {
      id: 3,
      text: "Budget?",
      options: [
        { text: "₹32,000 - ₹38,000 (Casual Home PC)", next: 4 },
        { text: "₹38,000 - ₹45,000 (Casual Home PC - Mid-Range)", next: 4 },
        { text: "₹45,000+ (Casual Home PC - High-End)", next: 4 }
      ]
    },
    {
      id: 4,
      text: "Budget?",
      options: [
        { text: "₹46,500 - ₹49,000 (Low-Cost Gaming PC)", next: 5 },
        { text: "₹49,000 - ₹55,000 (Low-Cost Gaming PC - Mid-Range)", next: 5 },
        { text: "₹55,000+ (Low-Cost Gaming PC - High-End)", next: 5 }
      ]
    },
    {
      id: 5,
      text: "Budget?",
      options: [
        { text: "₹55,000 - ₹65,000 (Entry-Level Gaming PC)", next: 6 },
        { text: "₹65,000 - ₹70,000 (Entry-Level Gaming PC - Mid-Range)", next: 6 },
        { text: "₹70,000+ (Entry-Level Gaming PC - High-End)", next: 6 }
      ]
    }
    {
      id: 8,
      text: "budget?",
      options: [
        { text: "", next: 4 },
        { text: "", next: 4 },
        { text: "", next: 4 },
      ],
    },
    {
      id: 4,
      text: "Thank you! We'll recommend a PC.",
      options: [],
    },
    {
      id: 5,
      text: "Specialized Setup?",
      options: [
        { text: "Overclocking Enthusiast", next: 7 },
        { text: "Silent PC Build", next: 7 },
        { text: "Mini ITX Compact PC", next: 7 },
        { text: "Modding & Custom Water Cooling Build", next: 7 },
        { text: "Energy-Efficient PC", next: 7 },
      ],
    },
    {
      id: 6,
      text: "PC for Specialized Tasks?",
      options: [
        { text: "Business Workstation", next: 7 },
        { text: "Financial Trading", next: 7 },
        { text: "Server & Home Lab PC", next: 7 },
        { text: "Medical & Scientific Computing PC", next: 7 },
      ],
    },
    {
      id: 7,
      text: "Budget?",
      options: [
        { text: "₹130,000 - ₹250,000 (High-End Gaming PC)", next: 8 },
        { text: "₹250,000 - ₹400,000 (High-End Gaming PC - Mid-Range)", next: 8 },
        { text: "₹400,000+ (High-End Gaming PC - High-End)", next: 8 }
      ]
    },
    {
      id: 8,
      text: "Budget?",
      options: [
        { text: "₹85,000 - ₹250,000 (Competitive eSports PC)", next: 9 },
        { text: "₹250,000 - ₹380,000 (Competitive eSports PC - Mid-Range)", next: 9 },
        { text: "₹380,000+ (Competitive eSports PC - High-End)", next: 9 }
      ]
    },
    {
      id: 9,
      text: "Budget?",
      options: [
        { text: "₹95,000 - ₹250,000 (VR-Ready Gaming PC)", next: 10 },
        { text: "₹250,000 - ₹400,000 (VR-Ready Gaming PC - Mid-Range)", next: 10 },
        { text: "₹400,000+ (VR-Ready Gaming PC - High-End)", next: 10 }
      ]
    },
    {
      id: 10,
      text: "Budget?",
      options: [
        { text: "₹180,000 - ₹250,000 (Streaming PC)", next: 11 },
        { text: "₹250,000 - ₹400,000 (Streaming PC - Mid-Range)", next: 11 },
        { text: "₹400,000+ (Streaming PC - High-End)", next: 11 }
      ]
    },
    {
      id: 11,
      text: "Budget?",
      options: [
        { text: "₹125,000 - ₹350,000 (Streaming & Gaming Hybrid PC)", next: 12 },
        { text: "₹350,000 - ₹450,000 (Streaming & Gaming Hybrid PC - Mid-Range)", next: 12 },
        { text: "₹450,000+ (Streaming & Gaming Hybrid PC - High-End)", next: 12 }
      ]
    },
    {
      id: 12,
      text: "Budget?",
      options: [
        { text: "₹110,000 - ₹200,000 (Mini ITX Compact PC)", next: 13 },
        { text: "₹200,000 - ₹240,000 (Mini ITX Compact PC - Mid-Range)", next: 13 },
        { text: "₹240,000+ (Mini ITX Compact PC - High-End)", next: 13 }
      ]
    },
    {
      id: 13,
      text: "Budget?",
      options: [
        { text: "₹80,000 - ₹250,000 (Silent PC Build)", next: 14 },
        { text: "₹250,000 - ₹300,000 (Silent PC Build - Mid-Range)", next: 14 },
        { text: "₹300,000+ (Silent PC Build - High-End)", next: 14 }
      ]
    },
    {
      id: 14,
      text: "Budget?",
      options: [
        { text: "₹250,000 - ₹400,000 (Overclocking Enthusiast PC)", next: 15 },
        { text: "₹400,000 - ₹550,000 (Overclocking Enthusiast PC - Mid-Range)", next: 15 },
        { text: "₹550,000+ (Overclocking Enthusiast PC - High-End)", next: 15 }
      ]
    },
    {
      id: 15,
      text: "Budget?",
      options: [
        { text: "₹300,000 - ₹400,000 (Modding & Custom Water Cooling Build)", next: 16 },
        { text: "₹400,000 - ₹600,000 (Modding & Custom Water Cooling Build - Mid-Range)", next: 16 },
        { text: "₹600,000+ (Modding & Custom Water Cooling Build - High-End)", next: 16 }
      ]
    },
    {
      id: 16,
      text: "Budget?",
      options: [
        { text: "₹350,000 - ₹750,000 (Workstation Build)", next: 17 },
        { text: "₹750,000 - ₹950,000 (Workstation Build - Mid-Range)", next: 17 },
        { text: "₹950,000+ (Workstation Build - High-End)", next: 17 }
      ]
    },
    {
      id: 17,
      text: "Budget?",
      options: [
        { text: "₹65,000 - ₹120,000 (Business Workstation)", next: 18 },
        { text: "₹120,000 - ₹200,000 (Business Workstation - Mid-Range)", next: 18 },
        { text: "₹200,000+ (Business Workstation - High-End)", next: 18 }
      ]
    },
    {
      id: 18,
      text: "Budget?",
      options: [
        { text: "₹110,000 - ₹280,000 (Financial Trading PC)", next: 19 },
        { text: "₹280,000 - ₹420,000 (Financial Trading PC - Mid-Range)", next: 19 },
        { text: "₹420,000+ (Financial Trading PC - High-End)", next: 19 }
      ]
    },
    {
      id: 19,
      text: "Budget?",
      options: [
        { text: "₹100,000 - ₹240,000 (Server & Home Lab PC)", next: 20 },
        { text: "₹240,000 - ₹500,000 (Server & Home Lab PC - Mid-Range)", next: 20 },
        { text: "₹500,000+ (Server & Home Lab PC - High-End)", next: 20 }
      ]
    },
    {
      id: 20,
      text: "Budget?",
      options: [
        { text: "₹120,000 - ₹260,000 (Medical & Scientific Computing PC)", next: 21 },
        { text: "₹260,000 - ₹500,000 (Medical & Scientific Computing PC - Mid-Range)", next: 21 },
        { text: "₹500,000+ (Medical & Scientific Computing PC - High-End)", next: 21 }
      ]
    },
    {
      id: 21,
      text: "Budget?",
      options: [
        { text: "₹560,000 - ₹700,000 (Video Editing Workstation)", next: 22 },
        { text: "₹700,000 - ₹900,000 (Video Editing Workstation - Mid-Range)", next: 22 },
        { text: "₹900,000+ (Video Editing Workstation - High-End)", next: 22 }
      ]
    },
    {
      id: 22,
      text: "Budget?",
      options: [
        { text: "₹600,000 - ₹1,000,000 (3D Rendering & Animation PC)", next: 23 },
        { text: "₹1,000,000 - ₹1,400,000 (3D Rendering & Animation PC - Mid-Range)", next: 23 },
        { text: "₹1,400,000+ (3D Rendering & Animation PC - High-End)", next: 23 }
      ]
    },
    {
      id: 23,
      text: "Budget?",
      options: [
        { text: "₹580,000 - ₹880,000 (CAD & Engineering Workstation)", next: 24 },
        { text: "₹880,000 - ₹1,300,000 (CAD & Engineering Workstation - Mid-Range)", next: 24 },
        { text: "₹1,300,000+ (CAD & Engineering Workstation - High-End)", next: 24 }
      ]
    },
    {
      id: 24,
      text: "Budget?",
      options: [
        { text: "₹180,000 - ₹320,000 (Music Production Workstation)", next: 25 },
        { text: "₹320,000 - ₹450,000 (Music Production Workstation - Mid-Range)", next: 25 },
        { text: "₹450,000+ (Music Production Workstation - High-End)", next: 25 }
      ]
    },
    {
      id: 25,
      text: "Budget?",
      options: [
        { text: "₹1,600,000 - ₹1,800,000 (AI & Machine Learning Workstation)", next: 26 },
        { text: "₹1,800,000 - ₹2,000,000 (AI & Machine Learning Workstation - Mid-Range)", next: 26 },
        { text: "₹2,000,000+ (AI & Machine Learning Workstation - High-End)", next: 26 }
      ]
    },
    {
      id: 26,
      text: "Budget?",
      options: [
        { text: "₹400,000 - ₹580,000 (Software Development Workstation)", next: null },
        { text: "₹580,000 - ₹600,000 (Software Development Workstation - Mid-Range)", next: null },
        { text: "₹600,000+ (Software Development Workstation - High-End)", next: null }
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  const handleOptionClick = (option) => {
    const updatedAnswers = [
      ...answers,
      { questionId: currentQuestion, answer: option.text },
    ];
    setAnswers(updatedAnswers);
    setCurrentQuestion(option.next || 7);
  };

  const handlePrevious = () => {
    if (answers.length > 0) {
      const previousAnswers = [...answers];
      previousAnswers.pop();
      setAnswers(previousAnswers);
      setCurrentQuestion(
        previousAnswers.length > 0
          ? previousAnswers[previousAnswers.length - 1].questionId
          : 1
      );
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/recommend/",
        { answers }
      );
      setRecommendation(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching recommendation:", err);
      setError(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again."
      );
      setRecommendation(null); // Clear previous recommendations
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
                  className="w-75 h-15 text-xl font-bold rounded-4xl hover:bg-red-800/90 transition"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
            {currentQuestion > 1 && (
              <div className="flex space-x-4 mt-6">
                <button
                  className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                {currentQuestion === 7 && (
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
              <div className="mt-6 p-4 bg-red-600 text-white rounded-xl">
                <h3 className="text-xl font-bold">Error:</h3>
                <p>{error}</p>
              </div>
            )}
            {recommendation && (
              <div className="mt-10 p-6 bg-gray-800 rounded-xl">
                <h3 className="text-2xl font-bold">Recommended PC Build:</h3>
                <p>
                  CPU: {recommendation.cpu.name} (₹{recommendation.cpu.price})
                </p>
                <p>
                  GPU: {recommendation.gpu.name} (₹{recommendation.gpu.price})
                </p>
                <p>
                  RAM: {recommendation.ram.name} ({recommendation.ram.capacity}
                  GB, ₹{recommendation.ram.price})
                </p>
                <p>
                  Storage: {recommendation.storage.name} (
                  {recommendation.storage.capacity}GB, ₹
                  {recommendation.storage.price})
                </p>
                <p>
                  Motherboard: {recommendation.motherboard.name} (₹
                  {recommendation.motherboard.price})
                </p>
                <p>
                  PSU: {recommendation.psu.name} ({recommendation.psu.wattage}W,
                  ₹{recommendation.psu.price})
                </p>
                <p className="text-xl font-bold mt-4">
                  Total Cost: ₹{recommendation.total_cost}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
