

"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
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
    const time = new Date(Date.now() - i * 5000).toLocaleTimeString();
    const open = currentValue + Math.random() * 10 - 5;
    const close = open + Math.random() * 10 - 5;
    const low = Math.min(open, close) - Math.random() * 5;
    const high = Math.max(open, close) + Math.random() * 5;
    data.push([time, low, open, close, high]);
  }
  return data;
}

export default function StockChart({ stock }) {
  const [timeRange, setTimeRange] = useState("5M");
  const [data, setData] = useState(generateRandomData(425371, 5));
  const [currentValue, setCurrentValue] = useState(425371);
  const [change, setChange] = useState({ value: 0, percentage: 0 });

  const options = useMemo(
    () => ({
      backgroundColor: "transparent",
      legend: "none",
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: "#EF4444" },
        risingColor: { strokeWidth: 0, fill: "#10B981" },
      }
    }),
    []
  );

  return (
    <motion.div {...fadeInUp} className="bg-gray-800 p-6 rounded-lg shadow-lg my-6">
      <div className="flex justify-between">
        <h2 className="text-2xl text-white">{stock}</h2>
      </div>

      <Chart chartType="CandlestickChart" width="100%" height="400px" data={data} options={options} />
    </motion.div>
  );
}
