# Vue.js Wrapper for Angular Label Designer

This package provides a Vue.js wrapper for the Angular Label Designer component, enabling Vue.js developers to use the powerful label designer functionality without rewriting the entire Angular codebase.

## Installation

```bash
npm install @label-designer/vue-wrapper
```

## Usage

### Basic Usage

```vue
<template>
  <LabelDesigner
    :setup="labelSetup"
    :data="labelData"
    :available-fields="availableFields"
    @setup-change="handleSetupChange"
    @data-change="handleDataChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import LabelDesigner from '@label-designer/vue-wrapper'

const labelSetup = ref({
  // Your label setup configuration
})

const labelData = ref([
  // Your label data array
])

const availableFields = ref([
  // Available fields for the label
])

const handleSetupChange = (newSetup) => {
  labelSetup.value = newSetup
}

const handleDataChange = (newData) => {
  labelData.value = newData
}
</script>
```

### With Composition API

```vue
<script setup>
import { ref, onMounted } from 'vue'
import LabelDesigner from '@label-designer/vue-wrapper'

const labelDesigner = ref()
const setup = ref({
  page: {
    format: 'A4',
    orientation: 'portrait',
    margins: { top: 10, right: 10, bottom: 10, left: 10 }
  },
  labelItems: []
})

const data = ref([])
const availableFields = ref([
  { field: 'id', label: 'ID', type: 'text' },
  { field: 'name', label: 'Name', type: 'text' },
  { field: 'qrCode', label: 'QR Code', type: 'qrCode' }
])

const handleHtml = (htmlData) => {
  console.log('Generated HTML:', htmlData)
  // Handle the generated HTML for PDF creation
}
</script>

<template>
  <div>
    <h1>Label Designer</h1>
    <LabelDesigner
      ref="labelDesigner"
      :setup="setup"
      :data="data"
      :available-fields="availableFields"
      :show-intro="true"
      @html="handleHtml"
      @setup-change="setup = $event"
      @data-change="data = $event"
    />
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `setup` | `Object` | `{}` | Label setup configuration |
| `data` | `Array` | `[]` | Array of data objects for labels |
| `availableFields` | `Array` | `[]` | Available fields for the label |
| `defaultSetup` | `Object` | - | Default setup for new labels |
| `defaultAvailableFields` | `Array` | - | Default available fields |
| `showIntro` | `Boolean` | `true` | Show intro dialog on startup |
| `pdfLoading` | `Boolean` | `false` | Show PDF loading indicator |
| `qrCodeErrorCorrectionLevel` | `String` | - | QR code error correction level |
| `presets` | `Array` | - | Preset label configurations |
| `fileColumnMap` | `Object` | - | Column mapping for file imports |
| `translations` | `Object` | - | Custom translations |
| `viewSettings` | `Object` | - | View settings configuration |
| `defaultDomain` | `String` | - | Default domain for data generation |

## Events

| Event | Description |
|-------|-------------|
| `html` | Emitted when HTML is generated for PDF creation |
| `setup-change` | Emitted when label setup changes |
| `data-change` | Emitted when label data changes |
| `view-settings-change` | Emitted when view settings change |
| `intro-closed` | Emitted when intro dialog is closed |
| `available-fields-change` | Emitted when available fields change |
| `pdf-loading-change` | Emitted when PDF loading state changes |
| `file-column-map-change` | Emitted when file column mapping changes |

## Technical Details

This wrapper uses Angular Elements to create a custom web component from the Angular Label Designer component. The Vue.js wrapper then provides a seamless interface to this web component, handling prop updates and event emissions.

### Architecture

```
Vue App
    ↓
Vue LabelDesigner Component
    ↓
Angular Custom Element (Web Component)
    ↓
Angular LabelDesigner Component
```

## Requirements

- Vue.js 3.x
- Modern browser with custom elements support
- Angular dependencies (automatically installed)

## Limitations

- Requires Angular dependencies to be installed
- Custom element bootstrap adds initial loading time
- Some Angular-specific features may have different behavior in the web component context

## Development

```bash
# Install dependencies
npm install

# Build the wrapper
npm run build

# Watch for changes
npm run dev
```

## License

MIT - See the original Angular Label Designer license for component-specific terms.