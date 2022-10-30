import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    //   legend: {
    //     position: 'top' as const,
    //   },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Income",
      data: [20, 35, 10, 5, 0, 10, 20],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Expense",
      data: [20, 35, 10, 5, 0, 10, 20],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function HandleChart() {
  return (
    <div className="container text-center">
      <h1>HandleChart</h1>
      <hr />
      <Bar options={options} data={data} />
    </div>
  );
}
