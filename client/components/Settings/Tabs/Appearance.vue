<template>
  <v-sheet width="100%" height="100%" color="transparent">
    <span
      class="font-weight-bold text-h6"
      :class="[$vuetify.theme.dark ? '' : 'grey--text text--darken-2']"
      >Appearance</span
    >
    <div class="mt-4">
      <span class="text-subtitle-2">Choose your primary color</span>
      <div class="d-flex flex-wrap mt-2">
        <v-btn
          fab
          dark
          v-for="(color, index) in colors"
          :key="index"
          width="40"
          height="40"
          :color="color"
          link
          class="ma-1 rounded-pill"
          @click="changePrimaryColor(color)"
        >
          <v-icon v-if="color == primaryColor"> mdi-check </v-icon>
        </v-btn>
      </div>
    </div>
    <div class="mt-4">
      <span class="text-subtitle-2">Choose your theme</span>
      <div class="d-flex flex-wrap mt-2 align-center">
        <div class="mr-3 text-center">
          <div
            :class="[currentTheme == 'light' ? 'selected-theme' : '']"
            class="mb-1"
          >
            <v-card
              link
              light
              rounded="lg"
              width="200"
              elevation="3"
              class="pa-3 d-flex flex-column"
              @click="changeTheme('light')"
            >
              <v-sheet
                width="120"
                height="36"
                class="mb-2 rounded-lg"
                elevation="1"
                :color="$vuetify.theme.themes.light.secondary"
              ></v-sheet>
              <v-sheet
                width="120"
                height="36"
                class="ml-auto rounded-lg"
                color="blue"
              ></v-sheet>
            </v-card>
          </div>
          <span class="text-subtitle-2">Light</span>
        </div>
        <div class="text-center">
          <div
            :class="[currentTheme == 'dark' ? 'selected-theme' : '']"
            class="mb-1"
          >
            <v-card
              link
              dark
              rounded="lg"
              width="200"
              elevation="3"
              class="pa-3 d-flex flex-column"
              @click="changeTheme('dark')"
            >
              <v-sheet
                width="120"
                height="36"
                class="mb-2 rounded-lg"
                elevation="1"
                :color="$vuetify.theme.themes.dark.secondary"
              ></v-sheet>
              <v-sheet
                width="120"
                height="36"
                class="ml-auto rounded-lg"
                color="blue"
              ></v-sheet>
            </v-card>
          </div>
          <span class="text-subtitle-2">Dark</span>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppearanceTab extends Vue {
  colors = [
    '#F44336',
    '#E91E63',
    '#673AB7',
    '#3F51B5',
    '#03A9F4',
    '#009688',
    '#4CAF50',
    '#FFEB3B',
    '#FF9800',
  ]
  primaryColor = '#673AB7'

  get currentTheme() {
    return this.$vuetify.theme.dark ? 'dark' : 'light'
  }

  set currentTheme(theme: string) {
    if (theme == 'light') this.$vuetify.theme.dark = false
    else this.$vuetify.theme.dark = true
  }

  changePrimaryColor(color: string) {
    this.primaryColor = color
    this.$vuetify.theme.themes.dark.primary = color
    this.$vuetify.theme.themes.light.primary = color
  }

  changeTheme(theme: string) {
    this.currentTheme = theme
    if (theme == 'light') this.$vuetify.theme.dark = false
    else this.$vuetify.theme.dark = true
  }

  mounted() {
    console.log(this.$vuetify.theme.dark)
    console.log(this.currentTheme)
  }
}
</script>

<style scoped>
.selected-theme {
  border: 2px #03a9f4 solid;
  padding: 2px;
  border-radius: 11px;
}
</style>
