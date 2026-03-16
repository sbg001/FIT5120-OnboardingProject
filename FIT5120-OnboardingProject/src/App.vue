<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="brand-wrap">
        <div class="brand-badge">☀️</div>
        <div>
          <p class="brand-eyebrow">Sun Safety Web App</p>
          <h1 class="brand-title">Super Sun Safe</h1>
        </div>
      </div>

      <p class="brand-tagline">
        Smarter UV awareness for safer outdoor choices
      </p>
    </header>

    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%);
  color: #1f2937;
}

body {
  margin: 0;
}

.app-shell {
  min-height: 100vh;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 18px 32px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-badge {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #fde68a 0%, #f59e0b 100%);
  box-shadow: 0 10px 20px rgba(245, 158, 11, 0.25);
}

.brand-eyebrow {
  margin: 0 0 4px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f59e0b;
}

.brand-title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.1;
  color: #0f172a;
}

.brand-tagline {
  margin: 0;
  font-size: 0.95rem;
  color: #64748b;
  text-align: right;
}

.app-content {
  width: 100%;
}

@media (max-width: 768px) {
  .app-header {
    padding: 16px 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .brand-tagline {
    text-align: left;
    font-size: 0.9rem;
  }

  .brand-title {
    font-size: 1.3rem;
  }

  .brand-badge {
    width: 46px;
    height: 46px;
    font-size: 1.3rem;
  }
}
</style>