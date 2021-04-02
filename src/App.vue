<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <strong>LB Covid Daily Counter</strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="toggleTheme()" icon>
        <v-icon v-if="!$vuetify.theme.dark">mdi-lightbulb-on-outline</v-icon>
        <v-icon v-else>mdi-lightbulb-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home'

export default {
  name: 'App',

  components: {
    Home
  },

  data: () => ({
    //
  }),

  mounted() {
    const theme = localStorage.getItem('dark_theme')
    if (theme) {
      if (theme === 'true') this.$vuetify.theme.dark = true
      else this.$vuetify.theme.dark = false
    }
  },

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },

  methods: {
    toggleTheme: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString())
    }
  }
}
</script>
