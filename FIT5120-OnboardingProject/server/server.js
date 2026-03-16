// DATA LAYER PLACEHOLDER
// TODO: replace with database queries (Data Science teammate)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cmdxxecppngyuzwvmvdu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHh4ZWNwcG5neXV6d3ZtdmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNzk4NDIsImV4cCI6MjA4ODg1NTg0Mn0.TX5JvRfwpqV7FCvsCI1L0nzmn9dQ0G-bZvJVpcsgQgM"

const supabase = createClient(supabaseUrl, supabaseKey)
const awarenessData = {
  uvTrend: [
    { year: 2019, uv: 8.1 },
    { year: 2020, uv: 8.3 },
    { year: 2021, uv: 8.4 },
    { year: 2022, uv: 8.6 }
  ],

  cancerStats: [
    { year: 2019, cases: 12000 },
    { year: 2020, cases: 12500 },
    { year: 2021, cases: 13000 }
  ]
}

import express from "express"
import axios from "axios"
import cors from "cors"
import xml2js from "xml2js"

const app = express()

app.use(cors())

const PORT = 3000


// Root route 
app.get("/api/uv/current", async (req, res) => {

  try {

    const response = await axios.get(
      "https://uvdata.arpansa.gov.au/xml/uvvalues.xml"
    )

    const parser = new xml2js.Parser()

    const result = await parser.parseStringPromise(response.data)

    // debug
    console.log("UV XML parsed")

    const stations = result.stations?.location

    if (!stations) {
      return res.status(500).json({
        error: "UV station list not found"
      })
    }

    const melbourne = stations.find(
      s => s.$?.id === "Melbourne"
    )

    if (!melbourne) {
      return res.status(500).json({
        error: "Melbourne station not found"
      })
    }

    const uvIndex = parseFloat(melbourne.index[0])
    // get temperature from weather API
    const weather = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=-37.8136&longitude=144.9631&current_weather=true"
    )

    const temperature = weather.data.current_weather.temperature
    let riskLevel = "Low"

    if (uvIndex >= 11) riskLevel = "Extreme"
    else if (uvIndex >= 8) riskLevel = "Very High"
    else if (uvIndex >= 6) riskLevel = "High"
    else if (uvIndex >= 3) riskLevel = "Moderate"

    let reapplyMinutes = 120

    if (uvIndex >= 11) reapplyMinutes = 45
    else if (uvIndex >= 8) reapplyMinutes = 60
    else if (uvIndex >= 6) reapplyMinutes = 90
    else if (uvIndex >= 3) reapplyMinutes = 120
    else reapplyMinutes = 180
    const alertLevel = uvIndex >= 8 ? "danger" : "safe"

   
    res.json({
      location: "Melbourne VIC",
      uvIndex,
      temperature,
      riskLevel,
      alertLevel,
      reapplyMinutes
    })
  } catch (error) {

    console.error("UV API ERROR:", error)

    res.status(500).json({
      error: "Failed to fetch UV data"
    })

  }

})


// ===============================
// US2.1 UV Awareness
// AC2.1 Visualisation data
// ===============================
// AC2.1 UV Awareness Visualisation
// TODO: replace mock data with database query (Data teammate)

app.get("/api/awareness/uv-trend", async (req, res) => {

  const data = [
    { year: 2015, uvIndex: 7.4 },
    { year: 2016, uvIndex: 7.6 },
    { year: 2017, uvIndex: 7.8 },
    { year: 2018, uvIndex: 8.0 },
    { year: 2019, uvIndex: 8.1 },
    { year: 2020, uvIndex: 8.3 },
    { year: 2021, uvIndex: 8.4 },
    { year: 2022, uvIndex: 8.6 },
    { year: 2023, uvIndex: 8.7 },
    { year: 2024, uvIndex: 8.8 }
  ]

  res.json(data)

})


// AC2.1 UV Awareness Visualisation
// TODO: replace mock data with database query

app.get("/api/awareness/cancer-stats", async (req, res) => {

  const { data, error } = await supabase
    .from("skin_cancer_stats")
    .select("year, risk_diagnosis_ratio")

  if (error) {
    console.error(error)
    return res.status(500).json({ error: "Database error" })
  }

  const formatted = data.map(row => ({
    year: row.year,
    cases: row.risk_diagnosis_ratio
  }))

  res.json(formatted)

})

app.get("/api/awareness/temperature-trend", async (req, res) => {

  let allData = []
  let start = 0
  const pageSize = 1000

  while (true) {

    const { data, error } = await supabase
      .from("temperature")
      .select("year, max_temperature")
      .range(start, start + pageSize - 1)

    if (error) {
      console.error(error)
      return res.status(500).json({ error: "Database error" })
    }

    if (!data.length) break

    allData = allData.concat(data)
    start += pageSize
  }

  const yearly = {}

  allData.forEach(row => {
    if (!yearly[row.year]) {
      yearly[row.year] = { total: 0, count: 0 }
    }

    yearly[row.year].total += row.max_temperature
    yearly[row.year].count += 1
  })

  const result = Object.keys(yearly)
    .sort((a,b)=>a-b)
    .map(year => ({
      year: Number(year),
      temperature: yearly[year].total / yearly[year].count
    }))

  res.json(result)
})
// ===============================
// US3.3 Sun-Protective Clothing Guidance
// AC3.3 clothing recommendations based on UV Index
// ===============================
const clothingRules = [
  { 
    minUv: 0, 
    maxUv: 2, 
    level: "Low", 
    advice: "UV is barely there. You're good to go, but main character energy always includes a daily SPF anyway.", 
    items: ["Your usual fit", "Aesthetic sunnies if it's bright"] 
  },
  { 
    minUv: 3, 
    maxUv: 5, 
    level: "Moderate", 
    advice: "UV is creeping up. Time for a sun-smart fit check. Don't let the sun wreck your skin barrier.", 
    items: ["Oversized tee or a light layer", "Bucket hat", "Cute sunnies"] 
  },
  { 
    minUv: 6, 
    maxUv: 7, 
    level: "High", 
    advice: "The sun is officially hating on your skin today. High UV means it's time to layer up and protect that glow.", 
    items: ["Lightweight long sleeves (linen is a vibe)", "Maxi skirt or baggy pants", "Bucket hat", "UV-blocking sunnies"] 
  },
  { 
    minUv: 8, 
    maxUv: 10, 
    level: "Very High", 
    advice: "UV is absolutely roasting right now. Literally, do not go out without armor. Sun damage is not the vibe.", 
    items: ["UPF clothing (make it fashion)", "Wide-brim hat (hide from the haters & the sun)", "Dark wrap sunnies"] 
  },
  { 
    minUv: 11, 
    maxUv: 99, 
    level: "Extreme", 
    advice: "Demon mode UV. Honestly, just stay inside. If you *must* go out, cover literally everything and seek shade.", 
    items: ["UPF 50+ long sleeves & pants", "The biggest hat you own", "UV sunnies", "An iced coffee in the shade"] 
  }
];
app.get("/api/recommendation/clothing", (req, res) => {
  const uvIndex = parseFloat(req.query.uv || 0);

  // Find the matching rule based on the current UV Index
  const recommendation = clothingRules.find(rule => uvIndex >= rule.minUv && uvIndex <= rule.maxUv) || clothingRules[clothingRules.length - 1];

  // Send back the detailed object to the Vue frontend
  res.json({
    uvIndex,
    level: recommendation.level,
    advice: recommendation.advice,
    items: recommendation.items
  });
});

// ===============================
// US3.1 Sunscreen Dosage Guidance
// AC3.1 UV-Based Sunscreen Dosage
// ===============================

app.get("/api/sunscreen/dosage", (req, res) => {

  const uvIndex = parseFloat(req.query.uv || 5)

  let dosage = "1 teaspoon"
  let spf = "SPF30"
  let reapplyMinutes = 120

  if (uvIndex >= 8) {
    dosage = "2 teaspoons"
    spf = "SPF50"
    reapplyMinutes = 90
  }

  res.json({
    uvIndex,
    recommendedAmount: dosage,
    spf,
    reapplyMinutes
  })

})

// ===============================
// Start server
// ===============================
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
// ===============================
// US2.2 Personal UV Risk Assessment
// ===============================

app.get("/api/risk-assessment", (req, res) => {

  const skinType = req.query.skin || "medium"
  const uvIndex = parseFloat(req.query.uv || 5)

  let risk = "Low"

  if (uvIndex >= 8 && skinType === "fair") {
    risk = "Very High"
  }
  else if (uvIndex >= 6) {
    risk = "High"
  }
  else if (uvIndex >= 3) {
    risk = "Moderate"
  }

  res.json({
    skinType,
    uvIndex,
    risk
  })

})