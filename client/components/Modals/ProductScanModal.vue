<template>
  <v-dialog
    @keydown.esc="closeModal"
    v-model="scanModal"
    width="400"
    persistent
  >
    <v-sheet
      width="400"
      height="250"
      class="d-flex justify-center align-center barcode-container rounded-lg"
    >
      <div class="preloader-scan">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>

          <div class="diode">
            <div class="laser"></div>
          </div>
        </ul>
      </div>
      <v-sheet color="transparent" width="250">
        <v-form @submit.prevent="getProductByCode" class="pa-0 ma-0 pt-16">
          <v-text-field
            class="pa-0 ma-0 mt-15 text-subtitle-2"
            autofocus
            v-model="productCode"
            hide-details
            single-line
          ></v-text-field>
        </v-form>
      </v-sheet>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ProductScanModal extends Vue {
  @Prop() readonly scanModal!: boolean

  productCode = ''

  closeModal() {
    this.$emit('closeModal')
  }

  async getProductByCode() {
    if (this.productCode != '') {
      const product = await this.$inventory.getProductByCode(this.productCode)

      if (product) {
        const payload = {
          id: product.id,
          sku: product.sku,
          brand: product.brand,
          variant: product.variant,
          description: product.description,
          price: product.price['retail'],
          quantity: 1,
        }
        this.$emit('scanDone', payload)
        this.productCode = ''
      } else {
        this.productCode = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.preloader-scan {
  position: fixed;
  left: 0;
  right: 0;
  max-width: 300px;
  display: table;
  margin: 0 auto;
  height: 100%;
  text-align: center;

  @for $i from 1 through 24 {
    li:nth-child(#{$i}) {
      $w: random(10);
      width: #{$w}px;
    }
  }

  ul {
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    list-style-type: none;
    text-align: center;
    padding: 0;
  }

  li {
    display: inline-block;
    width: 2px;
    height: 100px;
    background-color: #444;
  }

  .laser {
    width: 120%;
    margin-left: -10%;
    background-color: tomato;
    height: 2px;
    position: absolute;
    top: 45%;
    z-index: 2;
    box-shadow: 0 0 4px red;
    animation: scanning 2s infinite;
  }

  .diode {
    animation: beam 0.01s infinite;
  }
}

.barcode-container {
  height: 100%;
}

@keyframes beam {
  50% {
    opacity: 0;
  }
}

@keyframes scanning {
  50% {
    transform: translateY(75px);
  }
}
</style>
