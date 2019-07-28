require('./bootstrap')
import App from './components/App.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload } from "@fortawesome/free-solid-svg-icons"

import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload)
Vue.component('vue-fontawesome', FontAwesomeIcon)

window.Vue = require('vue')
Vue.use(Buefy,
  {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas',
  })


const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})