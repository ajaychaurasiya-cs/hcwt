import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";

export default function HeightScaler() {
  const [heightCm, setHeightCm] = useState(170);
  const [metric, setMetric] = useState(true);
  const [capturing, setCapturing] = useState(false);

  const chartRef = useRef(null);

  // url base data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const height = params.get("height");
    const unit = params.get("unit");

    if (height) setHeightCm(Number(height));
    if (unit) setMetric(unit === "cm");
  }, []);

  // url function
  const shareLink = async () => {
    const unit = metric ? "cm" : "ft";

    const url = `${window.location.origin}${window.location.pathname}?height=${heightCm}&unit=${unit}`;

    // Mobile native share (WhatsApp etc.)
    if (navigator.share) {
      await navigator.share({
        title: "Height Comparison",
        text: "Check out this height comparison",
        url,
      });
    } else {
      // Desktop copy fallback
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const doorHeight = 210;

  // Convert to ft/in
  const cmToFtIn = (cm) => {
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inch = Math.round(totalInches % 12);
    return `${ft} ft ${inch} in`;
  };

  const downloadImage = async () => {
    setCapturing(true);

    setTimeout(async () => {
      const dataUrl = await htmlToImage.toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "height-comparison.png";
      link.href = dataUrl;
      link.click();
      setCapturing(false);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Height Comparison</h1>
      <p className="text-gray-400 mb-6">Real-time scale dashboard</p>

      {/* Controls */}
      {!capturing && (
        <div className="flex gap-4 mb-8">
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="bg-white/10 backdrop-blur px-4 py-2 rounded-full outline-none w-32 text-center"
            placeholder="Height cm"
          />

          <button
            onClick={() => setMetric(!metric)}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            {metric ? "Metric" : "Imperial"}
          </button>
        </div>
      )}

      {/* Chart Area */}
      <div
        ref={chartRef}
        className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex items-end gap-12 overflow-x-auto"
      >
        {/* USER BAR */}
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm text-gray-300">
            {metric ? `${heightCm} cm` : cmToFtIn(heightCm)}
          </span>

          <motion.div
            animate={{ height: heightCm }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-16 rounded-t-2xl bg-gradient-to-t from-blue-500 to-cyan-400 shadow-lg"
          />

          <span className="mt-2 text-gray-400 text-sm">You</span>
        </div>

        {/* DOOR BAR */}
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm text-gray-300">
            {metric ? "210 cm" : cmToFtIn(doorHeight)}
          </span>

          <div
            style={{ height: doorHeight }}
            className="w-16 rounded-t-2xl bg-gray-500/70"
          />

          <span className="mt-2 text-gray-400 text-sm">Door</span>
        </div>
      </div>

      {/* Download Button */}
      {!capturing && (
        <button
          onClick={downloadImage}
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition font-semibold"
        >
          Download Image
        </button>
      )}
      {/* Share Button */}
      <button
        onClick={shareLink}
        className="mt-4 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 transition font-semibold"
      >
        Share Link {`>`}
      </button>
    </div>
  );
}
