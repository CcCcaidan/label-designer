// Improved Vue.js wrapper using Web Components approach
import { defineComponent, onMounted, ref, watch, onUnmounted } from 'vue'
import { bootstrapAngularElements } from './angular-elements'

export interface LabelDesignerProps {
  setup?: any
  data?: any[]
  availableFields?: any[]
  defaultSetup?: any
  defaultAvailableFields?: any[]
  showIntro?: boolean
  pdfLoading?: boolean
  qrCodeErrorCorrectionLevel?: string
  presets?: any[]
  fileColumnMap?: any
  translations?: any
  viewSettings?: any
  defaultDomain?: string
}

let isAngularBootstrapped = false

export const LabelDesigner = defineComponent({
  name: 'LabelDesigner',
  props: {
    setup: { type: Object, default: () => ({}) },
    data: { type: Array, default: () => [] },
    availableFields: { type: Array, default: () => [] },
    defaultSetup: Object,
    defaultAvailableFields: Array,
    showIntro: { type: Boolean, default: true },
    pdfLoading: { type: Boolean, default: false },
    qrCodeErrorCorrectionLevel: String,
    presets: Array,
    fileColumnMap: Object,
    translations: Object,
    viewSettings: Object,
    defaultDomain: String
  },
  emits: [
    'html',
    'setup-change',
    'data-change',
    'view-settings-change',
    'intro-closed',
    'available-fields-change',
    'pdf-loading-change',
    'file-column-map-change'
  ],
  setup(props, { emit }) {
    const containerRef = ref<HTMLElement>()
    const isReady = ref(false)
    const error = ref<string>('')
    
    const eventListeners: Array<{ element: HTMLElement; event: string; handler: EventListener }> = []

    const addEventListeners = (element: HTMLElement) => {
      const events = [
        { name: 'html', emit: 'html' },
        { name: 'setupChange', emit: 'setup-change' },
        { name: 'dataChange', emit: 'data-change' },
        { name: 'viewSettingsChange', emit: 'view-settings-change' },
        { name: 'introClosed', emit: 'intro-closed' },
        { name: 'availableFieldsChange', emit: 'available-fields-change' },
        { name: 'pdfLoadingChange', emit: 'pdf-loading-change' },
        { name: 'fileColumnMapChange', emit: 'file-column-map-change' }
      ]

      events.forEach(({ name, emit: emitName }) => {
        const handler = (event: any) => {
          emit(emitName, event.detail)
        }
        element.addEventListener(name, handler)
        eventListeners.push({ element, event: name, handler })
      })
    }

    const updateElementProps = (element: any) => {
      Object.keys(props).forEach(key => {
        const value = props[key as keyof typeof props]
        if (value !== undefined) {
          // Convert camelCase to kebab-case for HTML attributes
          const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          if (typeof value === 'object') {
            element[key] = value
          } else {
            element.setAttribute(attrName, String(value))
          }
        }
      })
    }

    onMounted(async () => {
      try {
        // Bootstrap Angular Elements if not already done
        if (!isAngularBootstrapped) {
          await bootstrapAngularElements()
          isAngularBootstrapped = true
        }

        // Wait for custom element to be defined
        await customElements.whenDefined('angular-label-designer')

        // Create the Angular component element
        const labelDesignerElement = document.createElement('angular-label-designer')
        
        // Set initial props
        updateElementProps(labelDesignerElement)
        
        // Add event listeners
        addEventListeners(labelDesignerElement)
        
        // Append to container
        if (containerRef.value) {
          containerRef.value.appendChild(labelDesignerElement)
          isReady.value = true
        }
      } catch (err) {
        console.error('Failed to initialize Angular Label Designer:', err)
        error.value = err instanceof Error ? err.message : 'Unknown error'
      }
    })

    // Watch for prop changes
    watch(() => props, () => {
      if (isReady.value && containerRef.value) {
        const element = containerRef.value.querySelector('angular-label-designer')
        if (element) {
          updateElementProps(element)
        }
      }
    }, { deep: true })

    onUnmounted(() => {
      // Clean up event listeners
      eventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler)
      })
      eventListeners.length = 0
    })

    return {
      containerRef,
      isReady,
      error
    }
  },
  template: `
    <div ref="containerRef" class="vue-label-designer-wrapper">
      <div v-if="error" class="label-designer-error">
        <p>Error loading Label Designer: {{ error }}</p>
        <p>Please make sure all Angular dependencies are properly installed.</p>
      </div>
      <div v-else-if="!isReady" class="label-designer-loading">
        <p>Loading Label Designer...</p>
      </div>
      <!-- Angular component will be inserted here -->
    </div>
  `
})

export default LabelDesigner