import '@nuxt/types'

export type OrderData = {
  id: string
  customer: string
  payment: OrderPayment
  items: NotWellDefinedObject[]
  status: string
}

type OrderPayment = {
  method: string
  details: NotWellDefinedObject
  subTotal: number
  discount: number
  tax: number
  grandTotal: number
}

type Pending = {
  orders: NotWellDefinedObject[]
  count: number
}

export interface OrderPluginImp {
  pending: Pending
  pendingOrders: Pending
  change: boolean
  orderChange: boolean
  createOrder(orderItems: NotWellDefinedObject[]): Promise<NotWellDefinedObject>
  newOrder(orderItems: NotWellDefinedObject[]): Promise<NotWellDefinedObject>
  updateOrder(
    orderId: string,
    update: NotWellDefinedObject
  ): Promise<NotWellDefinedObject>
  updateOrderProperty(path: string, update: any): Promise<NotWellDefinedObject>
  payOrder(
    orderId: string,
    updateData: NotWellDefinedObject
  ): Promise<NotWellDefinedObject>
  getOrder(orderId: string): Promise<NotWellDefinedObject>
  getAllOrders(page: number, limit: number): Promise<NotWellDefinedObject[]>
  getPendingOrders(): Promise<NotWellDefinedObject>
  setCurrentOrder(orderId: string): Promise<NotWellDefinedObject>
  removeOrder(orderId: string): void
  removeOrders(orderIds: string[]): void
  getOrdersCount(): Promise<number>
  print(data: NotWellDefinedObject): Promise<any>
}
