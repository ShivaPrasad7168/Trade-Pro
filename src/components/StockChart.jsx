

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { ArrowUpRight, ArrowDownRight, PlusCircle, Eye, Clock } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function generateRandomData(currentValue, points) {
  const data = [["Time", "Low", "Open", "Close", "High"]];

  for (let i = 0; i < points; i++) {
    const time = new Date(Date.now() - i * 60000).toLocaleTimeString();
    const open = currentValue + (Math.random() - 0.5) * 1000;
    const close = open + (Math.random() - 0.5) * 2000;
    const low = Math.min(open, close) - Math.random() * 500;
    const high = Math.max(open, close) + Math.random() * 500;
    data.push([time, low, open, close, high]);
  }

  return data;
}

export default function StockChart({ stock }) {
  const [timeRange, setTimeRange] = useState("5M");
  const [data, setData] = useState(generateRandomData(425371, 5));
  const [currentValue, setCurrentValue] = useState(425371);
  const [change, setChange] = useState({ value: 0, percentage: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRandomData(currentValue, getDataPoints(timeRange));
      setData(newData);
      setCurrentValue(newData[newData.length - 1][3]);
      const initialValue = newData[1][2];
      const changeValue = currentValue - initialValue;
      const changePercentage = (changeValue / initialValue) * 100;
      setChange({ value: changeValue, percentage: changePercentage });
    }, 5000);

    return () => clearInterval(interval);
  }, [timeRange, currentValue]);

  const getDataPoints = (range) => {
    switch (range) {
      case "5M": return 5;
      case "10M": return 10;
      case "15M": return 15;
      case "30M": return 30;
      case "1H": return 60;
      default: return 5;
    }
  };

  const options = {
    backgroundColor: "transparent",
    legend: "none",
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#EF4444" },
      risingColor: { strokeWidth: 0, fill: "#10B981" },
    },
    chartArea: { width: "85%", height: "70%" },
    hAxis: {
      textStyle: { color: "#9CA3AF" },
      gridlines: { color: "transparent" },
    },
    vAxis: {
      textStyle: { color: "#9CA3AF" },
      gridlines: { color: "#374151" },
    },
  };

  return (
    <motion.div
      {...fadeInUp}
      className="bg-gray-800 p-6 rounded-lg shadow-lg my-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{stock}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white">
              {currentValue.toFixed(2)}
            </span>
            <motion.span
              className={`flex items-center ${
                change.value >= 0 ? "text-green-500" : "text-red-500"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={change.value}
            >
              {change.value >= 0 ? (
                <ArrowUpRight size={20} className="mr-1" />
              ) : (
                <ArrowDownRight size={20} className="mr-1" />
              )}
              {change.value > 0 ? "+" : ""}
              {change.value.toFixed(2)} ({change.percentage.toFixed(2)}%)
            </motion.span>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle className="inline-block mr-2" size={16} />
            Create Alert
          </motion.button>
          <motion.button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="inline-block mr-2" size={16} />
            Watchlist
          </motion.button>
        </div>
      </div>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
      <div className="flex justify-between mt-4 overflow-x-auto">
        {["5M", "10M", "15M", "30M", "1H"].map((range) => (
          <motion.button
            key={range}
            className={`text-sm ${
              timeRange === range ? "text-blue-500" : "text-gray-300"
            } hover:text-blue-500 transition-colors flex items-center`}
            onClick={() => setTimeRange(range)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Clock size={14} className="mr-1" />
            {range}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
