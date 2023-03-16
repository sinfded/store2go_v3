export interface SettingsPluginImp {
  setTheme(theme: string): void
  setAccentColor(color: string): void
  setPrinter(printerName: string): void
  setCurrentOrderId(orderId: string): Promise<NotWellDefinedObject | null>
  getUserSettings(): NotWellDefinedObject | undefined
  uploadProfilePic(image: File, uid: string): Promise<NotWellDefinedObject>
  addPrinter(printerData: NotWellDefinedObject): Promise<NotWellDefinedObject>
  getAllPrinters(): Promise<NotWellDefinedObject[]>
}
