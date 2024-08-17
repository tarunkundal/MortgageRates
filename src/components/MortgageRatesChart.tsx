
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ChartProps {
  data: {
    data: Record<string, number>; // Data object with rate as string keys and number values
    request: object;
    timestamp: string;
  };
}

const MortgageRateChart: React.FC<ChartProps> = ({ data }) => {
  // Sort the data keys (interest rates) numerically
  const sortedRates = Object.keys(data.data)
    .map(rate => parseFloat(rate)) // Convert keys to numbers
    .sort((a, b) => a - b) // Sort in ascending order
    .map(rate => rate.toFixed(3)); // Convert back to strings with 3 decimal places

  // Define the type for chart data
  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }

  // Construct chart data
  const chartData: ChartData = {
    labels: sortedRates, 
    datasets: [
      {
        label: 'Number of Lenders',
        data: sortedRates.map(rate => data.data[rate]), 
        backgroundColor: 'rgba(130, 202, 157, 0.5)',
      },
    ],
  };

  // Define chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Interest rates for your situation (%)',
        },
        ticks: {
          callback: (_value, index) => {
            return sortedRates[index]; // Display x-axis labels as percentages
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of lenders offering rates',
        },
        ticks: {
          callback: (value: string | number) => {
            return value; // Display y-axis values as is
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const rate = context.label;
            const value = context.raw as number;
          return `${value} lenders are offering rates at ${rate}%` },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MortgageRateChart;
