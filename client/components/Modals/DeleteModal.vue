<template>
  <v-dialog v-model="deleteModal" persistent max-width="400px">
    <v-card rounded="lg">
      <v-sheet class="px-1 pt-1">
        <v-row no-gutters align="center">
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('closeModal')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet class="px-3">
        <v-row no-gutters justify="center" align="center">
          <v-icon size="72" color="red lighten-1">mdi-trash-can-outline</v-icon>
        </v-row>
      </v-sheet>
      <v-sheet class="d-flex justify-center flex-column align-center">
        <span class="text-h6 grey--text text--darken-2 my-2"
          >Are you sure?</span
        >
        <span class="text-subtitle-2 text-center grey--text mb-4"
          >Do you really want to delete these records? This process cannot be
          undone.</span
        >
      </v-sheet>
      <v-sheet width="100%" class="pa-3 pb-6">
        <v-row no-gutters justify="center">
          <v-btn
            depressed
            class="text-capitalize rounded-lg"
            @click="$emit('closeModal')"
          >
            Cancel
          </v-btn>
          <v-btn
            dark
            color="red lighten-1"
            class="text-capitalize ml-4 rounded-lg"
            @click="deleteItems"
          >
            Delete
          </v-btn>
        </v-row>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class DeleteModal extends Vue {
  @Prop() readonly deleteModal!: boolean

  deleteItems() {
    this.$emit('confirmDelete')
  }
}
</script>
