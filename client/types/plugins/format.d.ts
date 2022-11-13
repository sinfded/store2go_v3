export interface FormatPlugin {
  currencyFormat(value: number | string): any
  numberFormat(value: number | string, minFracDig: number): any
}
