"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    // Use AI generated data for initial render
    const aiGeneratedData = generateAIFormData();
    prepareChartData(aiGeneratedData);
  }, []);

  // Simulate AI generated form data
  const generateAIFormData = () => {
    return [
      { question: "Question 1", responses: Array.from({ length: Math.floor(Math.random() * 10) + 1 }) },
      { question: "Question 2", responses: Array.from({ length: Math.floor(Math.random() * 10) + 1 }) },
      { question: "Question 3", responses: Array.from({ length: Math.floor(Math.random() * 10) + 1 }) },
      { question: "Question 4", responses: Array.from({ length: Math.floor(Math.random() * 10) + 1 }) }
    ];
  };

  const prepareChartData = (data) => {
    if (!Array.isArray(data) || data.length === 0) return;

    const questionLabels = data.map((d) => d.question);
    const responseCounts = data.map((d) => d.responses.length);

    setBarData({
      labels: questionLabels,
      datasets: [
        {
          label: "Number of Responses",
          data: responseCounts,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }
      ]
    });

    const totalResponses = responseCounts.reduce((a, b) => a + b, 0);
    const averageResponses = (totalResponses / data.length).toFixed(1);
    const maxResponses = Math.max(...responseCounts);
    const minResponses = Math.min(...responseCounts);
    const mostPopularQuestion = data[responseCounts.indexOf(maxResponses)].question;
    const leastPopularQuestion = data[responseCounts.indexOf(minResponses)].question;

    // Update pie chart with arbitrary data for demonstration purposes
    const pieLabels = ["Option 1", "Option 2", "Option 3"];
    const pieCounts = [Math.floor(totalResponses / 3), Math.floor(totalResponses / 3), totalResponses - Math.floor(totalResponses / 3) * 2];

    setPieData({
      labels: pieLabels,
      datasets: [
        {
          label: "Responses",
          data: pieCounts,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    });

    setSummaryData({
      totalResponses,
      averageResponses,
      mostPopularQuestion,
      leastPopularQuestion
    });
  };

  const [summaryData, setSummaryData] = useState({
    totalResponses: 0,
    averageResponses: 0,
    mostPopularQuestion: '',
    leastPopularQuestion: ''
  });

  return (
    <div className="container p-8 mx-auto">
      <h2 className="flex items-center justify-between text-3xl font-bold">
        Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Total Responses</h3>
          <p className="text-2xl">{summaryData.totalResponses}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Average Responses</h3>
          <p className="text-2xl">{summaryData.averageResponses}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Most Popular Question</h3>
          <p className="text-2xl">{summaryData.mostPopularQuestion}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Least Responses</h3>
          <p className="text-2xl">{summaryData.leastPopularQuestion}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-wrap items-start justify-between mt-8">
        <div className="w-full h-[400px] p-4 lg:w-1/2">
          {/* Bar Chart */}
          <h3 className="mb-4 text-xl font-semibold">Responses Overview</h3>
          <div className="p-4 bg-white rounded-lg shadow">
            {barData.labels ? (
              <Bar data={barData} />
            ) : (
              <p>No data available for Bar chart.</p>
            )}
          </div>
        </div>
        <div className="w-full p-4 lg:w-1/2">
          {/* Pie Chart */}
          <h3 className="mb-4 text-xl font-semibold">Response Distribution</h3>
          <div className="p-4 bg-white rounded-lg shadow">
            {pieData.labels ? (
              <Pie data={pieData} />
            ) : (
              <p>No data available for Pie chart.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
