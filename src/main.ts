import { defineCustomElement } from 'vue'
import Widget from './components/Widget.ce.vue'

// convert into custom element constructor
const WidgetElement = defineCustomElement(Widget)

// register
customElements.define('uniqe-widget', WidgetElement)
