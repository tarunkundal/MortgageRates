import React, { forwardRef, useImperativeHandle, useRef } from 'react';
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
import { Box, Button, Typography } from '@mui/material';
import states from '../helpers/states.json';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ChartProps {
  data: {
    data: Record<string, number>; // Data object with rate as string keys and number values
    request: { state: string };
    timestamp: string;
  };
}

interface ChartRef {
  toBase64Image: () => string | undefined;
}

const MortgageRateChart = forwardRef<ChartRef, ChartProps>(({ data }, ref) => {
  const chartRef = useRef<ChartJS<'bar', number[], string>>(null);

  // Sort the data keys (interest rates) numerically
  const sortedRates = Object.keys(data.data)
    .map(rate => parseFloat(rate)) // Convert keys to numbers
    .sort((a, b) => a - b) // Sort in ascending order
    .map(rate => rate.toFixed(3)); // Convert back to strings with 3 decimal places

  // Calculate the average interest rate
  const totalRates = sortedRates.reduce((sum, rate) => sum + parseFloat(rate) * data.data[rate], 0);
  const totalLenders = sortedRates.reduce((sum, rate) => sum + data.data[rate], 0);
  const averageRate = (totalRates / totalLenders).toFixed(3);

  // State name
  const stateName = states.find(state => state.abbreviation === data.request.state)?.name;

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
          callback: (_value, index) => sortedRates[index], // Display x-axis labels as percentages
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of lenders offering rates',
        },
        ticks: {
          callback: (value: string | number) => value, // Display y-axis values as is
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
            return `${value} lenders are offering rates at ${rate}%`;
          },
        },
      },
    },
  };

  // Expose chart instance methods to parent component
  useImperativeHandle(ref, () => ({
    toBase64Image: () => chartRef.current?.toBase64Image(),
  }));

    const handleDownloadChart = () => {
    if (chartRef.current) {
      const image = chartRef.current.toBase64Image();
      const link = document.createElement('a');
      link.href = image;
      link.download = 'mortgage_rate_chart.png';
      link.click();
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>

      <Typography variant="h6" align="center" gutterBottom>
        In {stateName}, most lenders in our data are offering rates at or below {averageRate}%.
        </Typography>
      <Box display='flex' justifyContent='right' alignItems={'center'}>
         <Button onClick={handleDownloadChart} variant="contained" color="primary" sx={{ mt: 2,mr:2 }}>
                Download Chart
              </Button>
      </Box>
      <Bar data={chartData} options={options} ref={chartRef} />
    </div>
  );
});

export default MortgageRateChart;
