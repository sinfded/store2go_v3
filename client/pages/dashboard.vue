<template>
  <v-container fluid class="pa- ma-0"> </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout: 'main',
})
export default class Dashboard extends Vue {
  mounted() {
    console.log(this.$vuetify)
  }
}
</script>
