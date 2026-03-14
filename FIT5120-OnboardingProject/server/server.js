// DATA LAYER PLACEHOLDER
// TODO: replace with database queries (Data Science teammate)

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

const app = express()

app.use(cors())

const PORT = 3000


// Root route 
app.get("/", (req, res) => {
  res.send("UV Safety API is running")
})


// ===============================
// US1.1 Real-Time Localised UV Alerts
// AC1.1 + AC1.3
// ===============================
app.get("/api/uv/current", async (req, res) => {

  try {

    const lat = -37.8136
    const lon = 144.9631

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&current_weather=true`
    )

    const uvIndex = response.data.hourly.uv_index[0]
    const temperature = response.data.current_weather.temperature

    let riskLevel = "Low"

    if (uvIndex >= 11) riskLevel = "Extreme"
    else if (uvIndex >= 8) riskLevel = "Very High"
    else if (uvIndex >= 6) riskLevel = "High"
    else if (uvIndex >= 3) riskLevel = "Moderate"

    // AC1.3 alert trigger logic
    let alertLevel = "safe"

    if (uvIndex >= 8) {
      alertLevel = "danger"
    }

    res.json({
      location: "Melbourne VIC",
      uvIndex,
      temperature,
      riskLevel,
      alertLevel,
      reapplyMinutes: 120
    })

  } catch (error) {

    console.error("UV API error:", error)

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

app.get("/api/awareness/uv-trend", (req, res) => {

  const data = [
    { year: 2019, uvIndex: 7.9 },
    { year: 2020, uvIndex: 8.1 },
    { year: 2021, uvIndex: 8.2 },
    { year: 2022, uvIndex: 8.4 },
    { year: 2023, uvIndex: 8.5 }
  ]

  res.json(data)

})


// AC2.1 UV Awareness Visualisation
// TODO: replace mock data with database query

app.get("/api/awareness/cancer-stats", (req, res) => {

  const data = [
    { year: 2019, cases: 12000 },
    { year: 2020, cases: 12500 },
    { year: 2021, cases: 13000 }
  ]

  res.json(data)

})


// ===============================
// US3.3 Sun-Protective Clothing Guidance
// AC3.3 (AI teammate will improve later)
// ===============================
app.get("/api/recommendation/clothing", (req, res) => {

  const uvIndex = parseFloat(req.query.uv || 0)

  let recommendation = []

  if (uvIndex >= 8) {
    recommendation = [
      "Wide-brim hat",
      "Long sleeve shirt",
      "UV sunglasses"
    ]
  } else {
    recommendation = [
      "Sunglasses",
      "Light protective clothing"
    ]
  }

  res.json({
    uvIndex,
    items: recommendation
  })

})

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