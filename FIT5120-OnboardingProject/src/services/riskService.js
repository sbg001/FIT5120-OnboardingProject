export async function getRiskAssessment(skin, uv) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/risk-assessment?skin=${skin}&uv=${uv}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch risk assessment:', error)
    return null
  }
}