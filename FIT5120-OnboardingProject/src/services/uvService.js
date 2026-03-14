export async function getCurrentUV() {

  try {

    const response = await fetch("http://localhost:3000/api/uv/current")

    const data = await response.json()

    return data

  } catch (error) {

    console.error("Failed to fetch UV data:", error)

    return null

  }

}