<template>
  <div class="risk-page">
    <section class="page-title-section">
      <p class="page-eyebrow">Risk Assessment</p>
      <h1 class="page-title">Check your personal UV risk</h1>
      <p class="page-subtitle">
        Explore how skin type and UV level affect personal sun exposure risk.
      </p>
    </section>

    <section class="risk-hero">
      <div class="input-card">
        <p class="card-eyebrow">Interactive Inputs</p>
        <h2>Set your conditions</h2>
        <p class="card-text">
          Choose a skin type and UV level to see a personalised risk result.
        </p>

        <div class="form-group">
          <label for="skinType">Skin Type</label>
          <select id="skinType" v-model="skinType" @change="fetchRisk">
            <option value="fair">Fair</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div class="form-group">
          <label for="uvRange">UV Index: <strong>{{ uvValue }}</strong></label>
          <input
            id="uvRange"
            v-model="uvValue"
            type="range"
            min="0"
            max="12"
            step="1"
            @change="fetchRisk"
          />
        </div>

        <div class="quick-buttons">
          <button class="chip" @click="setRiskInputs('fair', 9)">High Risk Example</button>
          <button class="chip" @click="setRiskInputs('medium', 6)">Moderate Example</button>
          <button class="chip" @click="setRiskInputs('dark', 3)">Low Example</button>
        </div>
      </div>

      <div class="result-card" v-if="riskData">
        <p class="card-eyebrow">Assessment Result</p>
        <h2>Personal UV risk result</h2>

        <div class="risk-badge" :class="riskClass">
          {{ riskData.risk }}
        </div>

        <div class="result-grid">
          <div class="result-box">
            <p class="result-label">Skin Type</p>
            <p class="result-value">{{ capitalizedSkinType }}</p>
          </div>

          <div class="result-box">
            <p class="result-label">UV Index</p>
            <p class="result-value">{{ riskData.uvIndex }}</p>
          </div>

          <div class="result-box">
            <p class="result-label">Risk Level</p>
            <p class="result-value">{{ riskData.risk }}</p>
          </div>
        </div>

        <div class="guidance-note">
          <strong>Advice:</strong>
          {{ guidanceMessage }}
        </div>
      </div>

      <div class="result-card error-card" v-else-if="error">
        <p class="card-eyebrow">API Status</p>
        <h2>Could not load risk assessment</h2>
        <p>{{ error }}</p>
      </div>
    </section>

    <section class="education-section">
      <div class="education-card">
        <h3>Why personal risk matters</h3>
        <p>
          UV safety is not identical for everyone. Personalised assessment helps Chloe
          make better decisions instead of relying only on a general warning.
        </p>
      </div>

      <div class="education-card">
        <h3>How to use this page</h3>
        <p>
          Try different UV levels and skin types to see how quickly the risk level
          changes. This makes the app feel interactive and educational during demos.
        </p>
      </div>
    </section>
  </div>
  <PageHeader></PageHeader>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getRiskAssessment } from '../services/riskService'
import PageHeader from '../components/PageHeader.vue'

const router = useRouter()

const skinType = ref('medium')
const uvValue = ref(5)
const riskData = ref(null)
const error = ref('')

async function fetchRisk() {
  error.value = ''
  riskData.value = null

  const result = await getRiskAssessment(skinType.value, uvValue.value)

  if (result) {
    riskData.value = result
  } else {
    error.value = 'The risk assessment API could not be reached. Make sure the backend server is running on port 3000.'
  }
}

async function setRiskInputs(skin, uv) {
  skinType.value = skin
  uvValue.value = uv
  await fetchRisk()
}

function goBack() {
  router.push('/')
}

const capitalizedSkinType = computed(() => {
  return skinType.value.charAt(0).toUpperCase() + skinType.value.slice(1)
})

const riskClass = computed(() => {
  const risk = riskData.value?.risk?.toLowerCase()

  if (risk === 'very high') return 'risk-very-high'
  if (risk === 'high') return 'risk-high'
  if (risk === 'moderate') return 'risk-moderate'
  return 'risk-low'
})

const guidanceMessage = computed(() => {
  const risk = riskData.value?.risk

  if (risk === 'Very High') {
    return 'Your skin may be damaged quickly. Use SPF50, seek shade, and wear protective clothing.'
  }

  if (risk === 'High') {
    return 'Protection is strongly recommended. Apply sunscreen and limit direct sun exposure.'
  }

  if (risk === 'Moderate') {
    return 'Some protection is recommended, especially if spending longer periods outdoors.'
  }

  return 'Risk is currently low, but staying sun-aware is still a good habit.'
})

onMounted(() => {
  fetchRisk()
})
</script>

<style scoped>
.risk-page {
  min-height: 100vh;
  padding: 32px;
  background: transparent;
  color: #1f2937;
}

.page-title-section {
  margin-bottom: 24px;
}

.page-eyebrow {
  margin: 0 0 8px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7c3aed;
}

.page-title {
  margin: 0 0 10px;
  font-size: 2.2rem;
}

.page-subtitle {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
  max-width: 700px;
}

.risk-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.input-card,
.result-card,
.education-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}

.input-card,
.result-card {
  padding: 28px;
}

.card-eyebrow {
  margin: 0 0 10px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #7c3aed;
}

.input-card h2,
.result-card h2 {
  margin: 0 0 12px;
  font-size: 1.8rem;
}

.card-text {
  margin: 0 0 22px;
  color: #4b5563;
  line-height: 1.7;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

.form-group select,
.form-group input[type="range"] {
  width: 100%;
}

.form-group select {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #d1d5db;
  background: #fff;
  font-size: 1rem;
}

.quick-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  border: none;
  border-radius: 999px;
  padding: 10px 14px;
  background: #ede9fe;
  color: #5b21b6;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.chip:hover {
  background: #ddd6fe;
  transform: translateY(-2px);
}

.risk-badge {
  display: inline-block;
  margin: 6px 0 20px;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.95rem;
}

.risk-low {
  background: #dcfce7;
  color: #166534;
}

.risk-moderate {
  background: #fef3c7;
  color: #92400e;
}

.risk-high {
  background: #ffedd5;
  color: #c2410c;
}

.risk-very-high {
  background: #fee2e2;
  color: #b91c1c;
}

.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin: 20px 0;
}

.result-box {
  padding: 18px;
  border-radius: 18px;
  background: #f8fafc;
}

.result-label {
  margin: 0 0 8px;
  font-size: 0.9rem;
  color: #6b7280;
}

.result-value {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
}

.guidance-note {
  padding: 16px;
  border-radius: 16px;
  background: #f5f3ff;
  color: #4b5563;
  line-height: 1.7;
}

.education-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.education-card {
  padding: 24px;
}

.education-card h3 {
  margin: 0 0 10px;
}

.education-card p {
  margin: 0;
  line-height: 1.7;
  color: #4b5563;
}

.error-card {
  border-left: 8px solid #ef4444;
}

.back-section {
  margin-top: 30px;
  text-align: center;
}

.back-btn {
  border: none;
  background: #1d4ed8;
  color: white;
  padding: 12px 22px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.back-btn:hover {
  background: #1e40af;
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .risk-hero,
  .education-section,
  .result-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .risk-page {
    padding: 20px;
  }

  .page-title {
    font-size: 1.9rem;
  }

  .input-card h2,
  .result-card h2 {
    font-size: 1.5rem;
  }
}
</style>