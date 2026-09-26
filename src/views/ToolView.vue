<template>
  <div v-if="!tool">
    <p>Tool tidak ditemukan. <router-link to="/">Kembali</router-link></p>
  </div>
  <div v-else>
    <router-link to="/" class="back-link">← Semua tool</router-link>
    <h1 class="page-title">{{ tool.icon }} {{ tool.label }}</h1>
    <p class="page-desc">{{ tool.description }}</p>

    <div class="panel">
      <div v-if="errorMessage" class="alert alert-error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

      <!-- Input file -->
      <template v-if="tool.inputType === 'file'">
        <div class="field">
          <label>{{ tool.multiple ? "Pilih file (bisa lebih dari satu)" : "Pilih file" }}</label>
          <div class="file-drop">
            <input
              type="file"
              :multiple="tool.multiple"
              :accept="tool.accept"
              @change="onFilesSelected"
            />
            <ul v-if="selectedFiles.length" class="file-list">
              <li v-for="(f, i) in selectedFiles" :key="i">{{ f.name }} ({{ formatSize(f.size) }})</li>
            </ul>
          </div>
        </div>
      </template>

      <!-- Input URL (htmlpdf) -->
      <template v-else-if="tool.inputType === 'url'">
        <div class="field">
          <label>URL halaman web</label>
          <input type="url" v-model="sourceUrl" placeholder="https://contoh.com" />
        </div>
      </template>

      <!-- Field opsi dinamis -->
      <div v-for="field in visibleFields" :key="field.name" class="field">
        <template v-if="field.type === 'checkbox'">
          <div class="field-checkbox">
            <input type="checkbox" :id="field.name" v-model="formValues[field.name]" />
            <label :for="field.name" style="margin:0">{{ field.label }}</label>
          </div>
        </template>

        <template v-else-if="field.type === 'select'">
          <label>{{ field.label }}</label>
          <select v-model="formValues[field.name]">
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </template>

        <template v-else-if="field.type === 'textarea'">
          <label>{{ field.label }}</label>
          <textarea v-model="formValues[field.name]" :placeholder="field.placeholder"></textarea>
        </template>

        <template v-else-if="field.type === 'color'">
          <label>{{ field.label }}</label>
          <input type="color" v-model="formValues[field.name]" />
        </template>

        <template v-else-if="field.type === 'number'">
          <label>{{ field.label }}</label>
          <input type="number" v-model.number="formValues[field.name]" />
        </template>

        <template v-else>
          <label>{{ field.label }}</label>
          <input type="text" v-model="formValues[field.name]" :placeholder="field.placeholder" />
        </template>
      </div>

      <button class="btn" :disabled="loading || !canSubmit" @click="submit">
        {{ loading ? "Memproses..." : "Jalankan" }}
      </button>
    </div>

    <div v-if="jsonResult" class="panel">
      <h3 style="margin-top:0">Hasil (JSON)</h3>
      <pre class="result-json">{{ JSON.stringify(jsonResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { getToolConfig } from "../config/tools.js";
import { runPdfTool } from "../api/client.js";

const props = defineProps({ toolKey: { type: String, required: true } });

const tool = computed(() => getToolConfig(props.toolKey));
const selectedFiles = ref([]);
const sourceUrl = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const jsonResult = ref(null);
const formValues = reactive({});

function buildDefaultFormValues() {
  Object.keys(formValues).forEach((k) => delete formValues[k]);
  jsonResult.value = null;
  errorMessage.value = "";
  successMessage.value = "";
  selectedFiles.value = [];
  sourceUrl.value = "";
  (tool.value?.fields || []).forEach((f) => {
    formValues[f.name] = f.default;
  });
}

watch(() => props.toolKey, buildDefaultFormValues, { immediate: true });

const visibleFields = computed(() => {
  if (!tool.value) return [];
  return tool.value.fields.filter((f) => {
    if (!f.showIf) return true;
    return formValues[f.showIf.field] === f.showIf.equals;
  });
});

const canSubmit = computed(() => {
  if (!tool.value) return false;
  if (tool.value.inputType === "file") return selectedFiles.value.length > 0;
  if (tool.value.inputType === "url") return sourceUrl.value.trim().length > 0;
  return false;
});

function onFilesSelected(event) {
  selectedFiles.value = Array.from(event.target.files || []);
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function buildOptions() {
  const options = {};
  for (const field of tool.value.fields) {
    let value = formValues[field.name];
    if (value === "" || value === undefined) continue;

    if (field.json) {
      try {
        value = JSON.parse(value);
      } catch {
        throw new Error(`Field "${field.label}" harus berupa JSON yang valid.`);
      }
    } else if (field.cast === "number") {
      value = Number(value);
    }
    options[field.name] = value;
  }
  return options;
}

async function submit() {
  errorMessage.value = "";
  successMessage.value = "";
  jsonResult.value = null;
  loading.value = true;

  try {
    const options = buildOptions();
    const result = await runPdfTool(tool.value.key, {
      files: selectedFiles.value,
      sourceUrl: tool.value.inputType === "url" ? sourceUrl.value : undefined,
      options,
    });

    if (result.isJson) {
      jsonResult.value = result.data;
      successMessage.value = "Berhasil diproses.";
    } else {
      downloadBlob(result.data, result.filename);
      successMessage.value = `Berhasil! File "${result.filename}" sedang diunduh.`;
    }
  } catch (err) {
    errorMessage.value = await extractErrorMessage(err);
  } finally {
    loading.value = false;
  }
}

async function extractErrorMessage(err) {
  const data = err?.response?.data;
  if (data instanceof ArrayBuffer) {
    try {
      const text = new TextDecoder("utf-8").decode(data);
      const parsed = JSON.parse(text);
      return parsed.error || "Terjadi kesalahan saat memproses file.";
    } catch {
      // bukan JSON, abaikan
    }
  }
  return err?.message || "Terjadi kesalahan saat memproses file.";
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
</script>
