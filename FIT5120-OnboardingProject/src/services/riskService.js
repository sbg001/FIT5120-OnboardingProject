const API_BASE = "https://fit5120-onboardingproject.onrender.com"

export async function getRiskAssessment(skin, uv) {
  try {

    const response = await fetch(
      `${API_BASE}/api/risk-assessment?skin=${skin}&uv=${uv}`
    )

    if (!response.ok) {
      throw new Error("Risk API failed")
    }

    const data = await response.json()

    return data

  } catch (error) {

    console.error("Failed to fetch risk assessment:", error)

    return null

  }
}