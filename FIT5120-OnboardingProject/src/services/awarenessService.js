export async function getUvTrendData() {
  try {
    const response = await fetch('http://localhost:3000/api/awareness/uv-trend')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch UV trend data:', error)
    return []
  }
}

export async function getCancerStatsData() {
  try {
    const response = await fetch('http://localhost:3000/api/awareness/cancer-stats')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch cancer stats data:', error)
    return []
  }
}

export async function getTemperatureTrendData() {
  try {
    const response = await fetch('http://localhost:3000/api/awareness/temperature-trend')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch temperature trend data:', error)
    return []
  }
}