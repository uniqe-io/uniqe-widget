import { defineCustomElement } from 'vue'
import Widget from './components/Widget.ce.vue'

// convert into custom element constructor
const UniqeWidget = defineCustomElement(Widget)

export { UniqeWidget }
export function register() {
  customElements.define('uniqe-widget', UniqeWidget)
}

if (process.env.NODE_ENV !== 'production') {
  register()
}
