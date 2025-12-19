"use client";

import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";
import Header from "../../../components/Header";
import Breadcrumb from "../../../components/Breadcrumb";
import StockChart from "../../../components/StockChart";
import OptionsTable from "../../../components/OptionsTable";
import OpenInterest from "../../../components/OpenInterest";

export default function GrowwNIFTY50Page({ params }) {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="h-40 w-40 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Loading...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <Header />
      <main className="container mx-auto px-4">
        <Breadcrumb stock={id} />
        <StockChart stock={id} />
        <OptionsTable stock={id} />
        <OpenInterest />
      </main>
    </div>
  );
}

