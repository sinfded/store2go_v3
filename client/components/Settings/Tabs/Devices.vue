<template>
  <v-sheet width="100%" height="100%" color="transparent">
    <span
      class="font-weight-bold text-h6"
      :class="[$vuetify.theme.dark ? '' : 'grey--text text--darken-2']"
      >Devices</span
    >
    <div class="mt-4 px-1">
      <div class="d-flex align-center mb-2">
        <span class="text-subtitle-2">Choose your printer, or</span>
        <v-btn
          plain
          text
          :ripple="false"
          color="primary"
          @click="printerModal = true"
          class="ml-n2"
        >
          <span class="text-capitalize">Add</span>
        </v-btn>
      </div>
      <v-card
        v-for="(printer, index) in printers"
        :key="index"
        height="56"
        rounded="lg"
        class="d-flex align-center pa-4 text-subtitle-2 mb-2"
      >
        <v-row no-gutters align="center">
          <v-icon>mdi-printer</v-icon>
          <span class="ml-4">{{ printer.name }}</span>
          <v-spacer></v-spacer>
          <v-btn
            v-if="currentPrinter == printer.name"
            small
            color="primary"
            class="text-capitalize"
            disabled
            depressed
            >Current</v-btn
          >
          <v-btn
            v-else
            small
            color="primary"
            class="text-capitalize"
            @click="setPrinter(printer.name)"
            >Set as current</v-btn
          >
        </v-row>
      </v-card>
    </div>
    <PrinterModal
      v-if="printerModal"
      :printerModal="printerModal"
      v-on:closeModal="onClosePrinterModal"
    />
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PrinterModal from '~/components/Modals/PrinterModal.vue'

@Component({
  components: {
    PrinterModal,
  },
})
export default class DevicesTab extends Vue {
  currentPrinter: string = ''
  printers: NotWellDefinedObject[] = []
  printerModal = false

  get availablePrinters() {
    return this.printers
  }

  setPrinter(printerName: string) {
    this.$settings.setPrinter(printerName)
    this.onClosePrinterModal()
  }

  async onClosePrinterModal() {
    this.printers = await this.$settings.getAllPrinters()
    this.printerModal = false
  }

  async mounted() {
    console.log('Get Printers')
    const printers = await this.$settings.getAllPrinters()
    const userSettings = this.$settings.getUserSettings()

    this.printers = printers
    this.currentPrinter = userSettings?.printer
    console.log(this.printers)
    console.log(this.currentPrinter)
  }
}
</script>

<style scoped>
.selected-printer {
  border: 2px #03a9f4 solid;
  padding: 2px;
  border-radius: 11px;
}
</style>
