import { Plugin, Context } from '@nuxt/types'

export class FormatPlugin {
  constructor(private context: Context) {}

  currencyFormat(value: number | string) {
    let numValue = 0
    if (typeof value == 'string') numValue = parseFloat(value)
    else numValue = value
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(numValue)
  }

  numberFormat(value: number | string, minFracDig: number) {
    let numValue = 0
    if (typeof value == 'string') numValue = parseFloat(value)
    else numValue = value
    return new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: minFracDig,
    }).format(numValue)
  }
}

const formatPlugin: Plugin = function (context, inject) {
  inject('format', new FormatPlugin(context))
}

export default formatPlugin
