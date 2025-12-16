"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Bell, ShoppingCart, User, Zap, BarChart2, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <motion.header {...fadeInUp} className="flex justify-between items-center p-4 bg-gray-900 text-white sticky top-0 z-10">
      <div className="flex items-center space-x-8">
        <motion.span
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-blue-500 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          TradePro
        </motion.span>

        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <a href="/dashboard" className="text-blue-500 font-semibold flex items-center">
                <Zap className="mr-1" size={16} /> Explore
              </a>
            </li>
            <li>
              <a href="/dashboard" className="text-gray-300 hover:text-blue-500 flex items-center">
                <BarChart2 className="mr-1" size={16} /> Investments
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="What are you looking for today?"
            className="pl-10 pr-4 py-2 bg-gray-800 rounded-full text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Bell className="text-gray-300 cursor-pointer hover:text-blue-500" />
        <ShoppingCart className="text-gray-300 cursor-pointer hover:text-blue-500" />
        <User className="text-gray-300 cursor-pointer hover:text-blue-500" />

        <Menu
          className="md:hidden text-gray-300 cursor-pointer hover:text-blue-500"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed top-0 right-0 h-full w-64 bg-gray-800 p-4 z-50"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4">
              <X />
            </button>

            <nav className="mt-8">
              <ul className="space-y-4">
                <li>
                  <a className="text-blue-500 flex items-center">
                    <Zap className="mr-2" size={16} /> Explore
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-blue-500 flex items-center">
                    <BarChart2 className="mr-2" size={16} /> Investments
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
