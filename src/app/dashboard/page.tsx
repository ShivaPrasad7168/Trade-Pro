"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  Bell,
  BookOpen,
  ChevronRight,
  DollarSign,
  Globe,
  PieChart,
  Search,
  ShoppingCart,
  TrendingUp,
  UserIcon,
  Zap,
  Activity,
} from "lucide-react";
import { div, span } from "framer-motion/client";

const fadeinup = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Header = () => {
  const [ismenuopen, setismenuopen] = useState(false);
  const [notification, setnotification] = useState(3);
  return (
    <motion.header
      {...fadeinup}
      className="flex justify-between items-center p-4 bg-gray-900 text-white"
    >
      <div className="flex items-center space-x-8 ">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-blue-500"
        >
          Trade Pro
        </motion.span>
        <nav className="hidden md:block ">
          <ul className="flex gap-4 ">
            <li>
              <a
                href="/"
                className="text-blue-500 font-semibold flex items-center hover:text-blue-300 transition-colors"
              >
                <Zap className="mr-1" size={16} />
                Explore
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-blue-500 font-semibold flex items-center hover:text-blue-300 transition-colors"
              >
                <Globe className="mr-1" size={16} />
                Investments
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-blue-500 font-semibold flex items-center hover:text-blue-300 transition-colors"
              >
                <BookOpen className="mr-1" size={16} />
                Learn
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="What are yoy looking for"
            className="pl-10 pr-4 py-2 bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer"
        >
          <Bell className="text-gray-300 hover:text-blue-500 transition-colors" />
          {notification > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute -top-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
            >
              {notification}
            </motion.span>
          )}
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <ShoppingCart className="text-gray-300 hover:text-blue-500 transition-colors cursor-pointer" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <UserIcon className="text-gray-300 hover:text-blue-500 transition-colors cursor-pointer" />
        </motion.div>
      </div>
    </motion.header>
  );
};
const Tabsection = () => {
  const [activetab, setactivetab] = useState("Stocks");
  return (
    <motion.div {...fadeinup} className="border-b border-gray-700">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8">
          {["Stocks", "Mutual Funds", "ETFs", "Options"].map((tab) => (
            <motion.li
              className={`py-2 cursor-pointer whitespace-nowrap ${
                activetab === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-300 hover:text-blue-500 transition-colors"
              } `}
              key={tab}
              onClick={() => setactivetab(tab)}
              whileHover={{ scale: 1.1 }}
            >
              {tab}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const generaterandomvalues = (value: number) => {
  const change = (Math.random() * 2 - 1) * 100;
  const percentageChange = (change / value) * 100;
  return { change, percentageChange };
};

const Marketindices = () => {
  const [marketdata, setmarketdata] = useState([
    { name: "NIFT 50", values: 18256.36, change: 0, percentageChange: 0 },
    { name: "BANKNIFTY", values: 50256.86, change: 0, percentageChange: 0 },
    { name: "SENSEX", values: 30256.85, change: 0, percentageChange: 0 },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setmarketdata((prevdata) =>
        prevdata.map((index) => {
          const { change, percentageChange } = generaterandomvalues(
            index.values
          );
          const newvalue = index.values + change;
          return { ...index, values: newvalue, change, percentageChange };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {marketdata.map((index) => (
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <h3 className="font-semibold text-gray-300">{index.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-lg text-white">
              {index.values.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span
              className={`text-sm flex items-center ${
                index.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {index.change >= 0 ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              {index.change.toFixed(2)}({index.percentageChange.toFixed(2)}%)
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const StockCard = ({
  name,
  initialPrice,
}: {
  name: String;
  initialPrice: number;
}) => {
  const [price, setprice] = useState(initialPrice);
  const [change, setchange] = useState(0);
  const [percentchange, setpercentchange] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const { change: randomChange, percentageChange: randomPercentChange } =
        generaterandomvalues(price);
      setprice((preprice) => preprice + randomChange);
      setchange(randomChange);
      setpercentchange(randomPercentChange);
    }, 1000);
    return () => clearInterval(interval);
  }, [price]);
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition:shadow curson-pointer"
    >
      <h3 className="font-semibold text-white mb-2 ">{name}</h3>
      <span className="flex items-center justify-between">
        {price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
      </span>
      <motion.span
        key={change}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`text-sm flex items-center ${
          change > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {change >= 0 ? (
          <ArrowUpRight size={16} />
        ) : (
          <ArrowDownRight size={16} />
        )}
        {change.toFixed(2)}({percentchange.toFixed(2)}%)
      </motion.span>
    </motion.div>
  );
};

const MostBought = () => {
  return (
    <motion.div {...fadeinup} className="my-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">
          Most Bought on Trade Pro
        </h2>
        <motion.a
          href="#"
          className="text-blue-500 text-sm hover:underline flex items-center"
        >
          View All <ChevronRight className="ml-1" size={16} />
        </motion.a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StockCard name="Reliance" initialPrice={2346.2} />
        <StockCard name="Tata Motors" initialPrice={2386.2} />
        <StockCard name="Energy" initialPrice={2946.2} />
        <StockCard name="Zomato" initialPrice={9346.2} />
      </div>
    </motion.div>
  );
};

const ProductandTools = () => {
  const products = [
    { name: "F&O", icon: BarChart2 },
    { name: "IPO", icon: DollarSign },
    { name: "ETFs", icon: PieChart },
    { name: "FDs", icon: TrendingUp },
    { name: "US stock", icon: Activity },
  ];
  return (
    <motion.div {...fadeinup} className="my-8">
      <h2 className="text-xl font-semibold text-white">Products & Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <motion.div
            whileHover={{ scale: 1.04, backgroundColor: "#2D3748" }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center cursor-pointer"
            key={product.name}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
            >
              <product.icon className="text-white" />
            </motion.div>
            <span className="text-gray-300">{product.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Topgainers = () => {
  return (
    <motion.div {...fadeinup} className="my-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">
          Top Gainers
        </h2>
        <motion.a
          href="#"
          className="text-blue-500 text-sm hover:underline flex items-center"
        >
          View All <ChevronRight className="ml-1" size={16} />
        </motion.a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StockCard name="Trent" initialPrice={146.2} />
        <StockCard name="HDFC" initialPrice={236.2} />
        <StockCard name="ICIC" initialPrice={3946.2} />
        <StockCard name="Airtel" initialPrice={846.2} />
      </div>
    </motion.div>
  );
};

const page = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <Header />
      <main className="container mx-auto px-4   ">
        <Tabsection />
        <Marketindices />
        <MostBought />
        <ProductandTools />
        <Topgainers/>
      </main>
    </div>
  );
};
export default page;
