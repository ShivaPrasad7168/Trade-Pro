"use client";

import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { useState, useEffect } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function OpenInterest() {
  const [oiData, setOiData] = useState({
    totalPutOI: 3513795,
    putCallRatio: 0.99,
    totalCallOI: 3555969,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setOiData((prevData) => ({
        totalPutOI:
          prevData.totalPutOI + Math.floor((Math.random() - 0.5) * 10000),
        putCallRatio: prevData.putCallRatio + (Math.random() - 0.5) * 0.02,
        totalCallOI:
          prevData.totalCallOI + Math.floor((Math.random() - 0.5) * 10000),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      {...fadeInUp}
      className="bg-gray-800 p-6 rounded-lg shadow-lg py-6"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <BarChart2 size={24} className="mr-2" />
        Open Interest (OI)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-gray-400">Total Put OI</div>
          <div className="text-white text-xl">
            {oiData.totalPutOI.toLocaleString()}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-gray-400">Put/Call ratio</div>
          <div className="text-white text-xl">
            {oiData.putCallRatio.toFixed(2)}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-gray-400">Total Call OI</div>
          <div className="text-white text-xl">
            {oiData.totalCallOI.toLocaleString()}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
