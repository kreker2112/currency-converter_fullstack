import { createApp } from 'vue'

import App from '@/App.vue'

import router from '@/router/router'

import components from '@/components/UI'

import directives from '@/directives'

import store from '@/store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)

const app = createApp(App)

components.forEach((component) => {
    app.component(component.name, component)
})

directives.forEach((directive) => {
    app.directive(directive.name, directive)
})

app.use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .mount('#app')
