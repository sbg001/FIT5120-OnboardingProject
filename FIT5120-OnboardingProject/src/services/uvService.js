// API base URL
// Local development uses localhost
// Production uses deployed Render backend

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://fit5120-onboardingproject.onrender.com"

export async function getCurrentUV() {

  try {

    const response = await fetch(`${API_BASE}/api/uv/current`)

    if (!response.ok) {
      throw new Error("API response not OK")
    }

    const data = await response.json()

    return data

  } catch (error) {

    console.error("Failed to fetch UV data:", error)

    return null

  }

}