const API_BASE = "https://fit5120-onboardingproject.onrender.com"

export async function getSunscreenDosage(uv) {
  const response = await fetch(`${API_BASE}/api/sunscreen/dosage?uv=${uv}`)
  const data = await response.json()
  return data
}