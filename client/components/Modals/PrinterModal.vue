<template>
  <v-dialog v-model="printerModal" persistent max-width="400px">
    <v-card rounded="lg">
      <v-sheet class="px-3 py-2" dark color="primary">
        <v-row no-gutters align="center">
          <span class="text-subtitle-1 font-weight-medium">Add a Printer</span>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-n1" @click="$emit('closeModal')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet width="100%" class="px-2 pt-1">
        <v-row no-gutters>
          <v-col cols="12" class="px-1 pt-3">
            <v-combobox
              v-model="printerData.name"
              :items="availablePrinters"
              outlined
              label="Printer name"
              dense
              hide-details
              prepend-icon="mdi-printer"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="7" class="px-1 pt-3">
            <v-text-field
              v-model="printerData.pageSize"
              outlined
              label="Page size"
              suffix="mm"
              dense
              hide-details
              prepend-icon="mdi-arrow-expand-all"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-text-field
          ></v-col>
          <v-col cols="12" sm="5" class="px-1 pt-3">
            <v-text-field
              v-model="printerData.pageWidth"
              outlined
              label="Page width"
              suffix="px"
              dense
              hide-details
              prepend-icon="mdi-arrow-expand-horizontal"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-text-field
          ></v-col>
        </v-row>
      </v-sheet>
      <v-sheet width="100%" class="pa-3">
        <v-row no-gutters justify="end">
          <v-btn
            color="grey darken-1"
            class="text-capitalize rounded-lg white--text"
            width="100"
            depressed
            :disabled="printerData.name == ''"
            @click="testPrint"
          >
            Test
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="text-capitalize mr-2 rounded-lg"
            width="100"
            @click="addPrinter"
          >
            Save
          </v-btn>
          <v-btn
            depressed
            class="text-capitalize rounded-lg"
            width="100"
            @click="closeModal"
          >
            Cancel
          </v-btn>
        </v-row>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class PrinterModal extends Vue {
  @Prop() readonly printerModal!: boolean

  printerData: NotWellDefinedObject = {
    name: '',
    type: 'printer',
    pageSize: 57,
    pageWidth: 165,
  }
  printers: NotWellDefinedObject[] = []

  get availablePrinters() {
    return this.printers.map((printer: NotWellDefinedObject) => printer.name)
  }

  setPrinter(printerName: string) {}

  closeModal() {
    console.log('close')
    this.$emit('closeModal')
  }

  async testPrint() {
    if (this.printerData.name != '') {
      await this.$order.testPrint(this.printerData)
    }
  }

  async addPrinter() {
    if (this.printerData.name != '') {
      await this.$settings.addPrinter(this.printerData)
      this.$emit('closeModal')
    }
  }

  async mounted() {
    const { data: printers } = await this.$axios.get('/printers')

    this.printers = printers.result
  }
}
</script>
