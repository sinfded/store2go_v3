<template>
  <v-app dark>
    <NotificationToast />
    <Nuxt />
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Default extends Vue {}
</script>
