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

  orderIdFormat(value: number | string) {
    return String(value).padStart(4, '0')
  }

  longDateFormat(value: string, a: NotWellDefinedObject[], separator: string) {
    let s = this.join(
      new Date(value != null ? value : Date.now()),
      a,
      separator
    )
    return s
  }

  join(t: any, a: any, s: any) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat('en', m)
      return f.format(t)
    }
    return a.map(format).join(s)
  }
}

const formatPlugin: Plugin = function (context, inject) {
  inject('format', new FormatPlugin(context))
}

export default formatPlugin
