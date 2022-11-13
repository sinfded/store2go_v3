<template>
  <v-sheet width="100%" color="transparent" rounded="lg">
    <v-menu
      v-model="resultMenu"
      offset-y
      :nudge-bottom="5"
      close-on-content-click
      close-delay="2000"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          solo
          placeholder="Search for products"
          prepend-inner-icon="mdi-magnify"
          color="primary"
          class="text-subtitle-2 font-weight-regular flex-grow-1"
          :class="[
            $route.name == 'register'
              ? 'rounded-lg'
              : 'rounded-r-lg rounded-l-0',
          ]"
          background-color="accent"
          autofocus
          hide-details
          v-model="query"
          @keyup="search"
          v-on="on"
          v-bind="attrs"
          clearable
        ></v-text-field>
      </template>
      <v-sheet
        elevation="2"
        rounded="lg"
        class="flex-grow-1 overflow-y-auto px-2 pt-2"
        width="100%"
        max-width="100%"
        max-height="300"
      >
        <v-sheet
          v-if="searchResults.length == 0"
          height="36"
          elevation="0"
          rounded="lg"
          class="mb-2 px-3 d-flex align-center justify-center text-sm-subtitle-2 text-caption font-weight-medium grey--text text--darken-2"
          >Searching for {{ query }}</v-sheet
        >
        <v-sheet
          v-else
          v-for="(product, index) in searchResults"
          :key="index"
          height="56"
          elevation="1"
          rounded="lg"
          class="mb-2 px-3 d-flex align-center text-sm-subtitle-2 text-caption font-weight-medium grey--text text--darken-2"
        >
          <div class="d-flex flex-column justify-center align-start">
            <div class="d-flex align-center">
              <span class="mr-1">{{ product.brand }}</span>
              <span>
                {{ product.description }}
              </span>
              <v-sheet
                height="20"
                class="px-2 rounded-lg ml-2 text-caption font-weight-bold green--text text--darken-1 d-flex align-center"
                color="green lighten-5"
              >
                {{ product.variant }}
              </v-sheet>
            </div>
            <v-sheet
              width="100%"
              class="d-flex grey--text mt-n1"
              style="font-size: x-small"
              color="transparent"
            >
              <span>{{ product.sku }}</span>
            </v-sheet>
          </div>
          <v-spacer></v-spacer>
          <v-sheet class="d-flex align-center justify-center">
            <v-card
              class="d-flex flex-column px-2 py-1 blue--text text--darken-1 rounded-lg mx-1"
              color="blue lighten-5"
              height="auto"
              width="80"
              ripple
              :flat="$route.name == 'inventory'"
              :disabled="$route.name == 'inventory'"
              style="cursor: pointer"
              @click="toCart(product, 'wholesale')"
            >
              <span style="font-size: x-small; line-height: 1">Wholesale</span>
              <span
                class="text-caption mt-1 font-weight-medium text-center"
                style="line-height: 1"
                >{{ $format.currencyFormat(product.price.wholesale) }}</span
              >
            </v-card>
            <v-card
              class="d-flex flex-column px-2 py-1 red--text text--darken-1 rounded-lg mx-1"
              color="red lighten-5"
              height="auto"
              width="80"
              ripple
              :flat="$route.name == 'inventory'"
              :disabled="$route.name == 'inventory'"
              style="cursor: pointer"
              @click="toCart(product, 'retail')"
            >
              <span style="font-size: x-small; line-height: 1">Retail</span>
              <span
                class="text-caption mt-1 font-weight-medium text-center"
                style="line-height: 1"
                >{{ $format.currencyFormat(product.price.retail) }}</span
              >
            </v-card>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-menu>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ProductSearchBar extends Vue {
  resultMenu = false
  searchResults: NotWellDefinedObject[] = []
  query: string = ''

  async search() {
    if (this.query != '') {
      const searchQuery = this.query.trim()
      const result = await this.$inventory.searchProducts(searchQuery)
      if (result.length >= 1) {
        this.searchResults = result
        this.resultMenu = true
      }
    } else {
      this.searchResults = []
    }
  }

  toCart(product: NotWellDefinedObject, priceOption: string) {
    const payload = {
      id: product.id,
      sku: product.sku,
      brand: product.brand,
      variant: product.variant,
      description: product.description,
      price: product.price[priceOption],
      quantity: 1,
    }
    this.$emit('addToCart', payload)
  }
}
</script>
