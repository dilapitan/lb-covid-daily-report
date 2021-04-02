import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0052CC',
        secondary: '#182B4D',
        error: '#BF2600',
        background: '#F8F8FB',
        navBackground: '#FFFFFF'
      },
      dark: {
        primary: '#0052CC',
        secondary: '#182B4D',
        error: '#BF2600',
        background: '#16212B',
        navBackground: '#16212B'
      }
    }
  }
})
