const API_BASE = "https://fit5120-onboardingproject.onrender.com"

export async function getUvTrendData() {
  try {
    const response = await fetch(`${API_BASE}/api/awareness/uv-trend`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch UV trend data:', error)
    return []
  }
}

export async function getCancerStatsData() {
  try {
    const response = await fetch(`${API_BASE}/api/awareness/cancer-stats`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch cancer stats data:', error)
    return []
  }
}

export async function getTemperatureTrendData() {
  try {
    const response = await fetch(`${API_BASE}/api/awareness/temperature-trend`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch temperature trend data:', error)
    return []
  }
}

export async function getCurrentUvData() {
  try {
    const response = await fetch(`${API_BASE}/api/uv/current`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch current UV data:", error)
    return null
  }
}