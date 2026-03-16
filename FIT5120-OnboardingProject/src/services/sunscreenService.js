export async function getSunscreenDosage(uv) {
  try {
    const response = await fetch(`http://localhost:3000/api/sunscreen/dosage?uv=${uv}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch sunscreen dosage:', error)
    return null
  }
}