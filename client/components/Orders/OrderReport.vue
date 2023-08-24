<template>
  <v-sheet width="100%" height="100%" class="d-flex flex-column justify-start">
    <div
      class="py-1 text-subtitle-1 font-weight-bold"
      :class="[$vuetify.theme.dark ? '' : 'grey--text text--darken-2']"
    >
      Report
    </div>
    <div class="d-flex flex-column flex-grow-1 justify-space-between">
      <v-sheet width="100%" height="100%">
        <v-combobox
          v-model="reportData.type"
          :items="reportTypes"
          hide-details
          label="Type"
          dense
          outlined
          class="text-subtitle-2 rounded-lg"
        ></v-combobox>
        <v-sheet width="100%" class="text-subtitle-2 mt-2">
          <v-row no-gutters align="center">
            <span>Select the dates:</span>
            <v-spacer></v-spacer>

            <v-menu
              v-model="date1"
              :close-on-content-click="false"
              origin="top right"
              :nudge-right="10"
              :nudge-bottom="4"
              transition="scale-transition"
              offset-y
              nudge-width="300"
              max-width="300"
              class="rounded-lg"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-calendar </v-icon>
                </v-btn>
              </template>
              <v-date-picker
                v-model="reportData.dateRange"
                scrollable
                full-width
                no-title
                range
                color="primary"
                class="rounded-lg pb-2"
                @input="sortDate"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col cols="6" class="pr-1">
              <v-card
                class="d-flex flex-column px-2 py-1"
                color="grey lighten-4"
                rounded="lg"
                elevation="0"
              >
                <span>From</span>
                <span class="text-center mt-n1">{{
                  $format.longDateFormat(
                    reportData.dateRange[0],
                    [
                      { month: 'long' },
                      { day: 'numeric' },
                      { year: 'numeric' },
                    ],
                    ' '
                  )
                }}</span>
              </v-card>
            </v-col>
            <v-col cols="6" class="pl-1">
              <v-card
                class="d-flex flex-column px-2 py-1"
                color="grey lighten-4"
                rounded="lg"
                elevation="0"
              >
                <span>To</span>
                <span class="text-center mt-n1">{{
                  $format.longDateFormat(
                    reportData.dateRange[1],
                    [
                      { month: 'long' },
                      { day: 'numeric' },
                      { year: 'numeric' },
                    ],
                    ' '
                  )
                }}</span>
              </v-card>
            </v-col>
            <v-col cols="12"> </v-col>
          </v-row>
        </v-sheet>
      </v-sheet>
      <v-btn
        block
        color="primary"
        class="rounded-lg text-capitalize mt-2"
        large
        @click="generateReport"
      >
        Generate <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class OrderReport extends Vue {
  date1 = false
  reportTypes: NotWellDefinedObject[] = [
    {
      text: 'Sales Report',
      value: 'sales',
    },
    {
      text: 'Customer Sales Report',
      value: 'customer',
    },
  ]

  reportData: NotWellDefinedObject = {
    type: '',
    dateRange: [],
    name: '',
  }

  sortDate() {
    this.reportData.dateRange = this.reportData.dateRange.sort()
    console.log(this.reportData.dateRange)
  }

  groupByDate(orders: NotWellDefinedObject[]) {
    let results: NotWellDefinedObject[] = []

    const groupedByDate = orders.reduce((result, item) => {
      const date = new Date(item.paidAt).toLocaleDateString()
      if (!result[date]) {
        result[date] = []
      }
      result[date].push(item)
      return result
    }, {})

    results = Object.keys(groupedByDate)
      .map((key) => ({
        date: key,
        count: groupedByDate[key]?.length,
        subtotal: this.getOrdersSubtotal(groupedByDate[key]),
      }))
      .sort((a: NotWellDefinedObject, b: NotWellDefinedObject) => {
        if (a.date < b.date) {
          return -1
        }
        if (a.date > b.date) {
          return 1
        }
        return 0
      })

    return results
  }

  getOrdersSubtotal(orders: NotWellDefinedObject[]) {
    return orders.reduce(
      (total, { payment }) => total + (payment.amountPaid - payment.change),
      0
    )
  }

  generateReportName() {
    const type = this.reportData.type?.text.split(' ').join('-')
    const date =
      this.reportData.dateRange[0] == this.reportData.dateRange[1]
        ? this.$format.longDateFormat(
            this.reportData.dateRange[0],
            [{ month: 'numeric' }, { day: 'numeric' }, { year: 'numeric' }],
            '-'
          )
        : `${this.$format.longDateFormat(
            this.reportData.dateRange[0],
            [{ month: 'numeric' }, { day: 'numeric' }, { year: 'numeric' }],
            '-'
          )}-to-${this.$format.longDateFormat(
            this.reportData.dateRange[1],
            [{ month: 'numeric' }, { day: 'numeric' }, { year: 'numeric' }],
            '-'
          )}`

    return `${type}-${date}`
  }

  async generateReport() {
    const from = Date.parse(`${this.reportData.dateRange[0]} 00:00:00`)
    const to = Date.parse(`${this.reportData.dateRange[1]} 23:59:59`)

    console.log({ from, to })

    const orders = await this.$order.getOrdersByPaidDate(from, to)
    if (orders) {
      if (to - from <= 86400000) {
        console.log('Daily Sales Report')
        console.log(orders)
        console.log(this.generateReportName())
      } else {
        console.log('object')
        console.log(this.groupByDate(orders))
        console.log(this.generateReportName())
      }
    } else {
      this.$notifier.notifierState = {
        iconName: 'mdi-alert-circle-outline',
        color: 'error',
        message: `Select the proper report type.`,
      }
    }
  }

  mounted() {
    console.log(new Date().toISOString().substring(0, 10))
    this.reportData.dateRange = [
      new Date().toISOString().substring(0, 10),
      new Date().toISOString().substring(0, 10),
    ]
  }
}
</script>
