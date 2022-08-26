import { defineCustomElement } from 'vue'
import Widget from './components/UniqeWidget.ce.vue'

// convert into custom element constructor
const UniqeWidget = defineCustomElement(Widget)

customElements.define('uniqe-widget', UniqeWidget)
