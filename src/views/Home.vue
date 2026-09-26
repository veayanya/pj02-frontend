<template>
  <section class="hero">
    <div class="badge">
      <span class="badge-dot"></span>
      {{ TOOLS.length }} tool PDF siap dipakai
    </div>

    <h1>Semua Tool PDF<br><span class="grad">dalam Genggaman.</span></h1>
    <p class="subtitle">
      Gabung, pisah, kompres, kunci, ubah format, dan olah PDF lainnya —
      langsung dari browser tanpa install apa pun.
    </p>

    <div class="supported">
      <span>Populer:</span>
      <span class="chip">Gabung PDF</span>
      <span class="chip">Kompres PDF</span>
      <span class="chip">PDF ke Word</span>
      <span class="chip">Kunci PDF</span>
    </div>
  </section>

  <div class="grid">
    <router-link
      v-for="tool in TOOLS"
      :key="tool.key"
      :to="{ name: 'tool', params: { toolKey: tool.key } }"
      class="card"
    >
      <div class="card-icon">{{ tool.icon }}</div>
      <div class="card-title">{{ tool.label }}</div>
      <div class="card-desc">{{ tool.description }}</div>
    </router-link>
  </div>

  <section class="section">
    <div class="section-heading">
      <span class="eyebrow">CARA PAKAI</span>
      <h2>Selesai dalam 3 langkah</h2>
    </div>
    <div class="steps">
      <article>
        <div class="step-number">01</div>
        <h3>Pilih tool</h3>
        <p>Klik salah satu tool PDF di atas sesuai kebutuhan kamu.</p>
      </article>
      <article>
        <div class="step-number">02</div>
        <h3>Unggah file</h3>
        <p>Pilih file dari perangkat kamu, atau tempel URL bila diminta.</p>
      </article>
      <article>
        <div class="step-number">03</div>
        <h3>Unduh hasil</h3>
        <p>Klik "Jalankan" dan hasilnya langsung siap diunduh ke perangkatmu.</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { TOOLS } from "../config/tools.js";
</script>
