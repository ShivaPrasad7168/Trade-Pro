"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

export default function OptionsTable({ stock }) {
  const [options, setOptions] = useState([
    { strike: 25400, callPrice: 115.15, callChange: 17.0, putPrice: 97.55, putChange: -15.55 },
    { strike: 25300, callPrice: 95.4, callChange: -10.9, putPrice: 96.65, putChange: 28.85 },
    { strike: 25200, callPrice: 78.5, callChange: 32.78, putPrice: 73.65, putChange: -12.25 },
    { strike: 25100, callPrice: 29.7, callChange: -10.14, putPrice: 28.3, putChange: 20.74 },
  ]);

  return (
    <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg my-6">
      <h3 className="text-xl font-bold text-white flex items-center">
        <DollarSign className="mr-2" /> Top {stock} Options
      </h3>

      <table className="w-full mt-4">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th>Strike</th>
            <th>Call</th>
            <th>Put</th>
          </tr>
        </thead>

        <tbody>
          {options.map((opt, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="text-white p-2">{opt.strike}</td>

              <td className="p-2">
                <div className="text-white">{opt.callPrice}</div>
              </td>

              <td className="p-2">
                <div className="text-white">{opt.putPrice}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
