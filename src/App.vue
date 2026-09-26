<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="brand">Konversin</router-link>
      <router-link to="/" class="back-link">Semua Tool PDF</router-link>
    </div>
  </header>
  <main class="container">
    <router-view />
  </main>
  <footer>
    <span>© 2026 <strong>Konversin</strong></span>
    <span>Semua tool PDF dalam satu tempat</span>
  </footer>
</template>

<script setup>
</script>
