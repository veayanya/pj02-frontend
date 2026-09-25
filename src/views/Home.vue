<template>
  <div>
    <h1 class="page-title">🛠️ Semua Tool PDF</h1>
    <p class="page-desc">
      Pilih tool di bawah ini. Setiap tool dijalankan lewat backend yang memanggil iLovePDF API.
    </p>
    <div class="grid">
      <router-link
        v-for="tool in TOOLS"
        :key="tool.key"
        :to="{ name: 'tool', params: { key: tool.key } }"
        class="card"
      >
        <div class="card-icon">{{ tool.icon }}</div>
        <div class="card-title">{{ tool.label }}</div>
        <div class="card-desc">{{ tool.description }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { TOOLS } from "../config/tools.js";
</script>
