# Super Sun Safe – Backend API Documentation

## Base URL

Local development:

```
http://localhost:3000
```

Production (after deployment):

```
https://your-backend-url/api
```

---

# 1. Get Current UV Data

## Endpoint

```
GET /api/uv/current
```

## Description

Returns the current UV index and temperature for Melbourne, along with risk level and sunscreen reapplication guidance.

The UV data is retrieved from:

- ARPANSA UV monitoring service

Temperature data is retrieved from:

- Open-Meteo weather API

---

## Example Request

```
GET /api/uv/current
```

---

## Example Response

```json
{
  "location": "Melbourne VIC",
  "uvIndex": 5,
  "temperature": 18,
  "riskLevel": "Moderate",
  "alertLevel": "safe",
  "reapplyMinutes": 120
}
```

---

## Risk Levels

| UV Index | Risk Level |
|--------|--------|
| 0 – 2 | Low |
| 3 – 5 | Moderate |
| 6 – 7 | High |
| 8 – 10 | Very High |
| 11+ | Extreme |

---

# 2. Sunscreen Dosage Guidance

## Endpoint

```
GET /api/sunscreen/dosage
```

## Query Parameters

| Parameter | Type | Description |
|--------|--------|--------|
| uv | number | Current UV index |

---

## Example Request

```
GET /api/sunscreen/dosage?uv=8
```

---

## Example Response

```json
{
  "uvIndex": 8,
  "recommendedAmount": "2 teaspoons",
  "spf": "SPF50",
  "reapplyMinutes": 90
}
```

---

## Logic

| UV Level | SPF | Amount | Reapply |
|--------|--------|--------|--------|
| Low | SPF30 | 1 teaspoon | 120 min |
| High | SPF50 | 2 teaspoons | 90 min |

---

# 3. Clothing Recommendation

## Endpoint

```
GET /api/recommendation/clothing
```

## Query Parameters

| Parameter | Type | Description |
|--------|--------|--------|
| uv | number | Current UV index |

---

## Example Request

```
GET /api/recommendation/clothing?uv=9
```

---

## Example Response

```json
{
  "uvIndex": 9,
  "items": [
    "Wide-brim hat",
    "Long sleeve shirt",
    "UV sunglasses"
  ]
}
```

---

# 4. Personal UV Risk Assessment

## Endpoint

```
GET /api/risk-assessment
```

---

## Query Parameters

| Parameter | Type | Description |
|--------|--------|--------|
| skin | string | Skin type (fair, medium, dark) |
| uv | number | UV index |

---

## Example Request

```
GET /api/risk-assessment?skin=fair&uv=9
```

---

## Example Response

```json
{
  "skinType": "fair",
  "uvIndex": 9,
  "risk": "Very High"
}
```

---

# 5. UV Awareness – UV Trend

## Endpoint

```
GET /api/awareness/uv-trend
```

---

## Description

Returns historical UV trend data used for awareness visualisation.

---

## Example Response

```json
[
  { "year": 2019, "uvIndex": 7.9 },
  { "year": 2020, "uvIndex": 8.1 },
  { "year": 2021, "uvIndex": 8.2 },
  { "year": 2022, "uvIndex": 8.4 }
]
```

---

# 6. Skin Cancer Statistics

## Endpoint

```
GET /api/awareness/cancer-stats
```

---

## Description

Returns historical skin cancer case statistics for awareness visualisation.

The dataset will be integrated from the Australian open data portal once the database layer is completed.

---

## Example Response

```json
[
  { "year": 2019, "cases": 12000 },
  { "year": 2020, "cases": 12500 },
  { "year": 2021, "cases": 13000 }
]
```

---

# 7. Temperature Trend (Pending Database Integration)

## Endpoint

```
GET /api/awareness/temperature-trend
```

---

## Description

Returns historical temperature trend data used for awareness charts.

This endpoint will retrieve data from the database once the Data Science team completes the data pipeline.

---

# Technologies Used

Backend stack:

- Node.js
- Express.js
- Axios

External APIs:

- ARPANSA – UV data
- Open-Meteo – weather data

---

# Future Improvements

- Database integration for historical datasets
- Chart visualisation for awareness analytics
- Deployment to cloud infrastructure