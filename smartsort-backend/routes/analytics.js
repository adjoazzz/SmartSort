const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { restrictToFacility } = require('../middleware/auth');

router.get('/historical', restrictToFacility, dashboardController.getHistoricalAnalytics);

router.get('/tonnage', (req, res) => {
  res.status(200).json([
    { name: "Corrugated Cardboard", value: "420t (34%)", percent: 34, color: "bg-[#10b981]" },
    { name: "Mixed Plastics (PET/HDPE)", value: "312t (25%)", percent: 25, color: "bg-[#10b981]" },
    { name: "Aluminum & Metals", value: "224t (18%)", percent: 18, color: "bg-[#10b981]" },
    { name: "Glass (Clear/Amber)", value: "187t (15%)", percent: 15, color: "bg-[#10b981]" },
    { name: "Residual Waste", value: "105t (8%)", percent: 8, color: "bg-[#cbd5e1]" },
  ]);
});

router.get('/categories', (req, res) => {
  res.status(200).json([
    { icon: "boxes", name: "Recycled Paper & Pulp", volume: "582.4", growth: "+8.2%", growthTrend: "up", goal: 92, goalColor: "bg-[#10b981]" },
    { icon: "magnet", name: "Ferrous Metals", volume: "144.9", growth: "-2.1%", growthTrend: "down", goal: 78, goalColor: "bg-[#10b981]" },
    { icon: "drop", name: "Liquid Contaminants", volume: "22.8", growth: "+0.4%", growthTrend: "neutral", goal: 12, goalColor: "bg-[#ba1a1a]" },
  ]);
});

module.exports = router;
