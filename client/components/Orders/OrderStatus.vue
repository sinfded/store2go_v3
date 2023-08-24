<template>
  <v-sheet width="100%">
    <div
      class="py-1 text-subtitle-1 font-weight-bold"
      :class="[$vuetify.theme.dark ? '' : 'grey--text text--darken-2']"
    >
      Status
    </div>
    <div class="text-subtitle-2 pb-2">
      <v-row no-gutters class="mb-2">
        <v-sheet
          color="amber lighten-5"
          width="100%"
          height="64"
          class="rounded-lg d-flex"
        >
          <v-sheet
            width="64"
            color="amber rounded-l-lg d-flex justify-center align-center"
          >
            <v-icon size="40" color="white">mdi-receipt-text-clock</v-icon>
          </v-sheet>
          <div class="flex-grow-1 px-2">
            <div class="grey--text text--darken-3 py-1">Pending</div>
            <v-divider class="grey lighten-2"></v-divider>
            <div
              class="text-h6 font-weight-bold text-right grey--text text--darken-4"
            >
              {{ $format.numberFormat(ordersStatus.pending, 0) }}
            </div>
          </div>
        </v-sheet>
      </v-row>
      <v-row no-gutters class="mb-2">
        <v-sheet
          color="blue lighten-5"
          width="100%"
          height="64"
          class="rounded-lg d-flex"
        >
          <v-sheet
            width="64"
            color="blue rounded-l-lg d-flex justify-center align-center"
          >
            <v-icon size="40" color="white">mdi-receipt-text-check</v-icon>
          </v-sheet>
          <div class="flex-grow-1 px-2">
            <div class="grey--text text--darken-3 py-1">Fulfilled</div>
            <v-divider class="grey lighten-2"></v-divider>
            <div
              class="text-h6 font-weight-bold text-right grey--text text--darken-4"
            >
              {{ $format.numberFormat(ordersStatus.fulfilled, 0) }}
            </div>
          </div>
        </v-sheet>
      </v-row>
      <v-row no-gutters>
        <v-sheet
          color="green lighten-5"
          width="100%"
          height="64"
          class="rounded-lg d-flex"
        >
          <v-sheet
            width="64"
            color="green rounded-l-lg d-flex justify-center align-center"
          >
            <v-icon size="40" color="white">mdi-receipt-text</v-icon>
          </v-sheet>
          <div class="flex-grow-1 px-2">
            <div class="grey--text text--darken-3 py-1">Paid</div>
            <v-divider class="grey lighten-2"></v-divider>
            <div
              class="text-h6 font-weight-bold text-right grey--text text--darken-4"
            >
              {{ $format.numberFormat(ordersStatus.paid, 0) }}
            </div>
          </div>
        </v-sheet>
      </v-row>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
@Component
export default class OrderStatus extends Vue {
  @Prop() readonly refreshStatus!: boolean

  statuses: NotWellDefinedObject[] = []

  get orderTotal() {
    return (
      this.ordersStatus.pending +
      this.ordersStatus.fulfilled +
      this.ordersStatus.paid
    )
  }

  get ordersStatus() {
    return {
      pending: this.statuses.filter(
        (order: NotWellDefinedObject) => order.status == 'pending'
      ).length,
      fulfilled: this.statuses.filter(
        (order: NotWellDefinedObject) => order.status == 'fulfilled'
      ).length,
      paid: this.statuses.filter(
        (order: NotWellDefinedObject) => order.status == 'paid'
      ).length,
    }
  }

  async getOrdersStatus() {
    await this.$order
      .getAllOrdersStatus()
      .then((data: NotWellDefinedObject[]) => {
        this.statuses = data
      })
      .catch((err) => console.error(err))
  }

  mounted() {
    this.getOrdersStatus()
  }

  @Watch('refreshStatus')
  onRefreshStatus() {
    this.getOrdersStatus()
    this.$emit('statusRefreshed')
  }
}
</script>
