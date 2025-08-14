<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🏷️ Label Designer Vue.js Demo</h1>
      <p>Angular Label Designer component running seamlessly in Vue.js</p>
    </div>
    
    <div class="demo-content">
      <div class="controls" style="margin-bottom: 20px;">
        <h3>Demo Controls</h3>
        <button @click="addSampleData" :disabled="loading">Add Sample Data</button>
        <button @click="clearData" :disabled="loading">Clear Data</button>
        <button @click="resetSetup" :disabled="loading">Reset Setup</button>
        <span v-if="loading" style="margin-left: 10px; color: #666;">Loading...</span>
      </div>

      <div class="status" v-if="lastEvent" style="margin-bottom: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px;">
        <strong>Last Event:</strong> {{ lastEvent.type }} 
        <span v-if="lastEvent.data">({{ lastEvent.data.length || 'N/A' }} items)</span>
      </div>

      <!-- Label Designer Component -->
      <LabelDesigner
        :setup="setup"
        :data="data"
        :available-fields="availableFields"
        :default-setup="defaultSetup"
        :show-intro="showIntro"
        :default-domain="defaultDomain"
        @html="onHtml"
        @setup-change="onSetupChange"
        @data-change="onDataChange"
        @view-settings-change="onViewSettingsChange"
        @intro-closed="onIntroClosed"
        @available-fields-change="onAvailableFieldsChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LabelDesigner from '@label-designer/vue-wrapper'

// Reactive state
const loading = ref(false)
const lastEvent = ref(null)
const showIntro = ref(true)
const defaultDomain = ref('https://example.com/')

// Label configuration
const setup = ref({
  page: {
    format: 'A4',
    orientation: 'portrait',
    margins: { top: 15, right: 15, bottom: 15, left: 15 },
    width: 210,
    height: 297
  },
  labelItems: [],
  backSideLabelItems: [],
  twoSided: false
})

const defaultSetup = ref({
  page: {
    format: 'A4',
    orientation: 'portrait',
    margins: { top: 15, right: 15, bottom: 15, left: 15 },
    width: 210,
    height: 297
  },
  labelItems: [],
  backSideLabelItems: [],
  twoSided: false
})

const data = ref([])

const availableFields = ref([
  { field: 'id', label: 'ID', type: 'text' },
  { field: 'name', label: 'Name', type: 'text' },
  { field: 'scientificName', label: 'Scientific Name', type: 'text' },
  { field: 'date', label: 'Date', type: 'text' },
  { field: 'location', label: 'Location', type: 'text' },
  { field: 'collector', label: 'Collector', type: 'text' },
  { field: 'qrCode', label: 'QR Code', type: 'qrCode' },
  { field: 'barcode', label: 'Barcode', type: 'barcode' }
])

// Event handlers
const onHtml = (htmlData) => {
  lastEvent.value = { type: 'HTML Generated', data: htmlData }
  console.log('HTML generated:', htmlData)
}

const onSetupChange = (newSetup) => {
  setup.value = newSetup
  lastEvent.value = { type: 'Setup Changed', data: newSetup }
  console.log('Setup changed:', newSetup)
}

const onDataChange = (newData) => {
  data.value = newData
  lastEvent.value = { type: 'Data Changed', data: newData }
  console.log('Data changed:', newData)
}

const onViewSettingsChange = (viewSettings) => {
  lastEvent.value = { type: 'View Settings Changed', data: viewSettings }
  console.log('View settings changed:', viewSettings)
}

const onIntroClosed = () => {
  lastEvent.value = { type: 'Intro Closed', data: null }
  console.log('Intro closed')
}

const onAvailableFieldsChange = (fields) => {
  availableFields.value = fields
  lastEvent.value = { type: 'Available Fields Changed', data: fields }
  console.log('Available fields changed:', fields)
}

// Demo functions
const addSampleData = () => {
  loading.value = true
  
  setTimeout(() => {
    data.value = [
      {
        id: 'SPEC-001',
        name: 'Quercus robur',
        scientificName: 'Quercus robur L.',
        date: '2024-08-14',
        location: 'Central Park, New York',
        collector: 'John Smith',
        qrCode: 'https://example.com/specimen/SPEC-001'
      },
      {
        id: 'SPEC-002',
        name: 'Acer platanoides',
        scientificName: 'Acer platanoides L.',
        date: '2024-08-14',
        location: 'Brooklyn Botanic Garden',
        collector: 'Jane Doe',
        qrCode: 'https://example.com/specimen/SPEC-002'
      },
      {
        id: 'SPEC-003',
        name: 'Pinus sylvestris',
        scientificName: 'Pinus sylvestris L.',
        date: '2024-08-14',
        location: 'Highland Park, Rochester',
        collector: 'Bob Johnson',
        qrCode: 'https://example.com/specimen/SPEC-003'
      }
    ]
    loading.value = false
    lastEvent.value = { type: 'Sample Data Added', data: data.value }
  }, 500)
}

const clearData = () => {
  data.value = []
  lastEvent.value = { type: 'Data Cleared', data: [] }
}

const resetSetup = () => {
  setup.value = { ...defaultSetup.value }
  lastEvent.value = { type: 'Setup Reset', data: setup.value }
}

onMounted(() => {
  console.log('Vue.js Label Designer Demo mounted')
})
</script>

<style scoped>
.controls button {
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #42b883;
  background: white;
  color: #42b883;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.controls button:hover:not(:disabled) {
  background: #42b883;
  color: white;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>