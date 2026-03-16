const API_BASE = "https://fit5120-onboardingproject.onrender.com"

export async function getSunscreenDosage(uv) {

  try {

    const response = await fetch(
      `${API_BASE}/api/sunscreen/dosage?uv=${uv}`
    )

    if (!response.ok) {
      throw new Error("Dosage API failed")
    }

    const data = await response.json()

    return data

  } catch (error) {

    console.error("Dosage API error:", error)

    return null

  }

}