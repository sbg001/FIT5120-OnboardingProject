import express from "express"
import axios from "axios"
import cors from "cors"

const app = express()

app.use(cors())

const PORT = 3000

// AC1.1 + AC1.3
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

    res.json({
      location: "Melbourne VIC",
      uvIndex,
      temperature,
      riskLevel,
      reapplyMinutes: 120
    })

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch UV data"
    })

  }

})

// AC2.1
app.get("/api/awareness/uv-trend", (req, res) => {

  res.json([
    { year: 2019, uv: 8.1 },
    { year: 2020, uv: 8.3 },
    { year: 2021, uv: 8.4 },
    { year: 2022, uv: 8.6 }
  ])

})

app.get("/api/awareness/cancer-stats", (req, res) => {

  res.json([
    { year: 2019, cases: 12000 },
    { year: 2020, cases: 12500 },
    { year: 2021, cases: 13000 }
  ])

})

// AC3.3 placeholder
app.get("/api/recommendation/clothing", (req, res) => {

  res.json({
    items: [
      "Wide-brim hat",
      "UV sunglasses",
      "Long sleeve shirt"
    ]
  })

})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})