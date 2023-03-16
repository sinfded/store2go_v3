<template>
  <v-app dark>
    <v-sheet
      width="100%"
      height="100%"
      class="d-flex justify-center align-center"
    >
      <v-card
        width="40%"
        min-width="300"
        height="50%"
        min-height="200"
        class="d-flex justify-center align-center flex-column"
      >
        <h1 style="font-size: 10rem; line-height: 1">404</h1>
        <h2 v-if="error.statusCode === 404" class="grey--text">
          {{ pageNotFound }}
        </h2>
        <h2 v-else class="grey--text">
          {{ otherError }}
        </h2>
        <v-btn
          @click="goBack"
          class="mt-4 rounded-lg text-capitalize"
          color="primary"
        >
          <v-icon class="ml-n2 mr-1"> mdi-chevron-left </v-icon>
          Go back
        </v-btn>
      </v-card>
    </v-sheet>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Page Not Found',
      otherError: 'An error occurred',
    }
  },
  methods: {
    goBack() {
      console.log('GO back')
      this.$router.back()
    },
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
