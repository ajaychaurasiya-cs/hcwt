import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";

export default function HeightScaler() {
  const [name, setName] = useState("");
  const [heightCm, setHeightCm] = useState(170);
  const [metric, setMetric] = useState(true);
  const [users, setUsers] = useState([]);
  const [capturing, setCapturing] = useState(false);

  const chartRef = useRef(null);
  const doorHeight = 210;
  const MAX_USERS = 20;

  const colors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-green-500 to-emerald-400",
    "from-yellow-500 to-orange-400",
    "from-red-500 to-rose-400",
    "from-indigo-500 to-violet-400",
    "from-teal-500 to-lime-400",
  ];

  // Load from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");

    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        setUsers(decoded);
      } catch (err) {
        console.log("Invalid data");
      }
    }
  }, []);

  const cmToFtIn = (cm) => {
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inch = Math.round(totalInches % 12);
    return `${ft}ft ${inch}in`;
  };

  // Dynamic scale height
  const maxHeight = Math.max(
    doorHeight,
    heightCm,
    ...users.map((u) => u.height)
  );

  const scaleFactor = 300 / maxHeight; // 300px max chart height

  // Add user
  const addUser = () => {
    if (!name) return alert("Enter short name");
    if (users.length >= MAX_USERS)
      return alert("Max 20 users allowed");

    const updated = [
      ...users,
      { name: name.slice(0, 5), height: heightCm },
    ];

    setUsers(updated);
    generateShareLink(updated);
  };

  const generateShareLink = async (userData) => {
    const encoded = btoa(JSON.stringify(userData));
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;

    if (navigator.share) {
      await navigator.share({
        title: "Height Comparison Group",
        text: "Join our height comparison!",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  const downloadImage = async () => {
    setCapturing(true);
    setTimeout(async () => {
      const dataUrl = await htmlToImage.toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "group-height.png";
      link.href = dataUrl;
      link.click();
      setCapturing(false);
    }, 100);
  };

  // Candle width dynamic
  const totalBars = users.length + 2; // +1 door +1 live preview
  const candleWidth =
    totalBars <= 5
      ? "w-16"
      : totalBars <= 10
      ? "w-12"
      : "w-8";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        Group Height Comparison
      </h1>

      {/* Controls */}
      {!capturing && (
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <input
            type="text"
            placeholder="Short Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 px-4 py-2 rounded-full w-28 text-center"
          />

          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="bg-white/10 px-4 py-2 rounded-full w-24 text-center"
          />

          <button
            onClick={() => setMetric(!metric)}
            className="px-4 py-2 rounded-full bg-white/10"
          >
            {metric ? "Metric" : "Imperial"}
          </button>

          <button
            onClick={addUser}
            className="px-6 py-2 rounded-full bg-blue-600 hover:scale-105 transition"
          >
            Add & Share
          </button>
        </div>
      )}

      {/* Chart */}
      <div
        ref={chartRef}
        className="w-full max-w-5xl bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex items-end gap-4 overflow-x-auto"
      >
        {/* Existing Users */}
        {users.map((u, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-xs mb-1">
              {metric ? `${u.height} cm` : cmToFtIn(u.height)}
            </span>

            <motion.div
              animate={{
                height: u.height * scaleFactor,
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className={`${candleWidth} rounded-t-2xl bg-gradient-to-t ${
                colors[index % colors.length]
              }`}
            />

            <span className="mt-1 text-xs">{u.name}</span>
          </div>
        ))}

        {/* Live Preview Before Add */}
        {name && (
          <div className="flex flex-col items-center opacity-70">
            <span className="text-xs mb-1">
              {metric
                ? `${heightCm} cm`
                : cmToFtIn(heightCm)}
            </span>

            <motion.div
              animate={{
                height: heightCm * scaleFactor,
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className={`${candleWidth} rounded-t-2xl bg-gradient-to-t from-white to-gray-400`}
            />

            <span className="mt-1 text-xs">
              {name.slice(0, 5)}
            </span>
          </div>
        )}

        {/* Door */}
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">
            {metric
              ? "210 cm"
              : cmToFtIn(doorHeight)}
          </span>

          <div
            style={{
              height: doorHeight * scaleFactor,
            }}
            className={`${candleWidth} rounded-t-2xl bg-gray-500/70`}
          />

          <span className="mt-1 text-xs">Door</span>
        </div>
      </div>

      {!capturing && (
        <button
          onClick={downloadImage}
          className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
        >
          Download Image
        </button>
      )}
    </div>
  );
}