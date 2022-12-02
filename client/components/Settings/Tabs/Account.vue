<template>
  <v-sheet width="100%" height="100%" color="transparent">
    <span
      class="font-weight-bold text-h6"
      :class="[$vuetify.theme.dark ? '' : 'grey--text text--darken-2']"
      >Account</span
    >
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AccountTab extends Vue {}
</script>
