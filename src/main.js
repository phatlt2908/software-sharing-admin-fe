import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

require('@/assets/scss/main.scss')
require('@/plugins/fontawesome.js')

const vueApp = createApp(App)
vueApp.use(VueSweetalert2)
vueApp.use(router)
vueApp.component("font-awesome-icon", FontAwesomeIcon)

vueApp.mount('#app')

// Global use api
// If want to use api in global (dont need to import in per file)
// vueApp.config.globalProperties.api=api
