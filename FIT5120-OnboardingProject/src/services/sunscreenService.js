const API_BASE = "https://fit5120-onboardingproject.onrender.com"

export async function getDosageRecommendation(data) {
  try {

    const response = await fetch(`${API_BASE}/api/dosage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    return result

  } catch (error) {

    console.error("Dosage API error:", error)

    throw new Error("Could not load dosage recommendation")

  }
}