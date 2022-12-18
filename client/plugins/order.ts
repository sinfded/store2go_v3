import { Plugin, Context } from '@nuxt/types'
import { OrderData, OrderPluginImp, Pending } from '~/types/plugins/order'
import { db } from '~/config/acebase'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

const ordersRef = db.ref('orders')

export class OrderPlugin implements OrderPluginImp {
  $axios: NuxtAxiosInstance

  constructor(context: Context) {
    this.$axios = context.$axios
  }

  public currentOrder: NotWellDefinedObject = {}
  public orders: NotWellDefinedObject[] = []
  public pending: Pending = {
    orders: [],
    count: 0,
  }
  public change: boolean = false

  get pendingOrders() {
    return this.pending
  }

  get orderChange() {
    return this.change
  }

  async createOrder(
    orderItems: NotWellDefinedObject[]
  ): Promise<NotWellDefinedObject> {
    const orderId = (await ordersRef.count()) + 1
    const orderRef = await ordersRef.push({
      orderId: orderId,
      items: orderItems,
      status: 'pending',
      customer: 'Walk-in Customer',
      pricing: 'wholesale',
      createdAt: Date.now(),
    })

    db.auth.updateUserSettings({ currentOrderId: orderRef.key })
    localStorage.setItem('currentOrderId', orderRef.key)

    return orderRef
  }

  async newOrder(
    orderItems: NotWellDefinedObject[]
  ): Promise<NotWellDefinedObject> {
    const orderId = (await ordersRef.count()) + 1
    const orderRef = await ordersRef.push({
      orderId: orderId,
      items: orderItems,
      status: 'pending',
      customer: 'Walk-in Customer',
      pricing: 'wholesale',
      createdAt: Date.now(),
    })

    return orderRef
  }

  async updateOrder(orderId: string, update: NotWellDefinedObject) {
    const updatedOrder = await ordersRef.child(`${orderId}`).set(update)

    return updatedOrder
  }

  async updateOrderProperty(path: string, update: any) {
    return await db.ref(path).transaction((ss) => {
      let property = ss.val()
      if (!ss.exists()) {
        property = update
      }
      property = update
      return property
    })
  }

  async payOrder(
    orderId: string,
    updateData: NotWellDefinedObject
  ): Promise<NotWellDefinedObject> {
    const { payment, status } = updateData
    await this.updateOrderProperty(`/orders/${orderId}/status`, status)
    await this.updateOrderProperty(`/orders/${orderId}/payment`, payment)
    await db.auth.updateUserSettings({ currentOrderId: '' })
    const updatedOrder = await this.getOrder(orderId)

    return updatedOrder
  }

  removeOrder(orderId: string): void {
    const currentOrderId = localStorage.getItem('currentOrderId') || ''
    ordersRef.child(orderId).remove()
    if (currentOrderId == orderId) {
      localStorage.removeItem('currentOrderId')
      db.auth.updateUserSettings({ currentOrderId: '' })
    }
  }

  async removeOrders(orderIds: string[]) {
    let result: string = ''
    const currentOrderId = localStorage.getItem('currentOrderId') || ''
    orderIds.forEach(async (id: string) => {
      const res = await ordersRef.child(id).remove()
      if (currentOrderId == id) {
        localStorage.removeItem('currentOrderId')
        db.auth.updateUserSettings({ currentOrderId: '' })
      }
      result = res.key
    })

    return result
  }

  async getOrder(orderId: string): Promise<NotWellDefinedObject> {
    const order = ordersRef.child(orderId).get()

    return (await order).val()
  }

  async getPendingOrders() {
    let result: NotWellDefinedObject = {}
    let orderArray: NotWellDefinedObject[] = []

    const pendingOrders = db
      .query('orders')
      .filter('status', '==', 'pending')
      .sort('createdAt', false)
    const orders = await pendingOrders.get()
    const count = await pendingOrders.count()

    if (orders) {
      orders.forEach((order) => {
        const id = order.key
        const value = order.val()
        const { items, orderId } = value
        const numOfItems = items.length
        const subTotal = items.reduce(
          (total: number, curr: NotWellDefinedObject) => {
            return total + curr.subtotal
          },
          0
        )

        orderArray.push({ id, numOfItems, subTotal, orderId })
      })
      result = {
        orders: orderArray,
        count,
      }
    } else {
      result = {
        orders: [],
        count: 0,
      }
    }

    this.pending = result as Pending

    return result
  }

  async getAllOrders(page: number, limit: number) {
    let result: NotWellDefinedObject[] = []

    const orders = await db
      .query('orders')
      .take(limit)
      .skip((page - 1) * limit)
      .sort('createdAt', false)
      .get()
    if (orders) {
      orders.forEach((order) => {
        // this.removeOrder(order.key)
        if (order.key != 'null') {
          const id = order.key
          const value = order.val()

          result.push({ id, ...value })
        } else {
          this.removeOrder(order.key)
        }
      })
    } else {
      result = []
    }

    return result
  }

  async getOrdersCount(): Promise<number> {
    return await db.query('orders').count()
  }

  async print(data: NotWellDefinedObject): Promise<any> {
    const result = await this.$axios.post('http://localhost:8000/print', data)

    return result
  }

  async setCurrentOrder(orderId: string) {
    const currentOrder = await this.getOrder(orderId)
    await db.auth.updateUserSettings({ currentOrderId: orderId })
    localStorage.setItem('currentOrderId', orderId)

    return currentOrder
  }
}

const orderPlugin: Plugin = function (context, inject) {
  inject('order', new OrderPlugin(context))
}

export default orderPlugin
