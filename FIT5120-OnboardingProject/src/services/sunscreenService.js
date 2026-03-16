const API_BASE = "https://fit5120-onboardingproject.onrender.com"

export async function getDosageRecommendation(uv) {

  try {

    const response = await fetch(
      `${API_BASE}/api/sunscreen/dosage?uv=${uv}`
    )

    if (!response.ok) {
      throw new Error("Dosage API failed")
    }

    const result = await response.json()

    return result

  } catch (error) {

    console.error("Dosage API error:", error)

    return null

  }
}