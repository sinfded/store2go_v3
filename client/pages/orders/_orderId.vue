<template>
  <v-container fluid class="pa-0 ma-0">
    {{ $route.params.orderId }}</v-container
  >
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout: 'main',
})
export default class OrderPage extends Vue {
  async mounted() {
    console.log(await this.$order.getOrder(this.$route.params.orderId))
  }
}
</script>
