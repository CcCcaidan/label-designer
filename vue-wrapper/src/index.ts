// Vue.js wrapper for Angular Label Designer component
import { LabelDesigner } from './LabelDesigner'

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

export interface LabelDesignerEvents {
  html?: (event: any) => void
  setupChange?: (event: any) => void
  dataChange?: (event: any) => void
  viewSettingsChange?: (event: any) => void
  introClosed?: () => void
  availableFieldsChange?: (event: any) => void
  pdfLoadingChange?: (event: boolean) => void
  fileColumnMapChange?: (event: any) => void
}

export { LabelDesigner }
export default LabelDesigner