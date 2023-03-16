import { Plugin, Context } from '@nuxt/types'
import { OrderData, OrderPluginImp, Pending } from '~/types/plugins/order'
import { NotifierPlugin } from '~/types/plugins/notifier'
import { db } from '~/config/acebase'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

const ordersRef = db.ref('orders')
const customersRef = db.ref('customers')
const devicesRef = db.ref('devices')

export class OrderPlugin implements OrderPluginImp {
  $axios: NuxtAxiosInstance
  $notifier: NotifierPlugin

  constructor(context: Context) {
    this.$axios = context.$axios
    this.$notifier = context.$notifier
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
    const order = await this.getOrder(orderId)
    if (order.status == 'pending') {
      await this.updateOrderProperty(
        `/orders/${orderId}/fulfilledAt`,
        Date.now()
      )
    }
    await this.updateOrderProperty(`/orders/${orderId}/status`, status)
    await this.updateOrderProperty(`/orders/${orderId}/payment`, payment)
    await this.updateOrderProperty(`/orders/${orderId}/paidAt`, Date.now())
    if (payment.customer != 'Walk-in Customer') {
      await this.updateOrderProperty(
        `/orders/${orderId}/customer`,
        payment.customer
      )
      await this.createCustomer(payment.customer)
    }
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

  async getFulfilledOrders() {
    let result: NotWellDefinedObject = {}
    let orderArray: NotWellDefinedObject[] = []

    const pendingOrders = db
      .query('orders')
      .filter('status', '==', 'fulfilled')
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

  async print(printData: NotWellDefinedObject): Promise<any> {
    let result = null
    const currentPrinter = db.auth.user?.settings?.printer
    const printerData = (
      await devicesRef
        .query()
        .filter('type', '==', 'printer')
        .filter('name', '==', currentPrinter)
        .get()
    )[0].val()

    if (printerData) {
      const data = {
        printData: printData,
        printerName: printerData.name,
        pageSize: `${printerData.pageSize}mm`,
        pageWidth: `${printerData.pageWidth}px`,
      }
      result = await this.$axios.post(`/print`, data)
    } else {
      this.$notifier.notifierState = {
        iconName: 'mdi-information',
        color: 'error',
        message: `No printer detected.`,
      }
    }

    return result
  }

  async testPrint(printerData: NotWellDefinedObject): Promise<any> {
    let printData: NotWellDefinedObject[] = [
      {
        type: 'text',
        value: 'Test Print',
        style: {
          fontWeight: '700',
          textAlign: 'center',
          fontSize: '14px',
          fontFamily: 'Cambria',
        },
      },
      {
        type: 'text',
        value: 'This is a test print.',
        style: {
          fontSize: '11px',
          textAlign: 'center',
          fontWeight: '500',
          fontFamily: 'Cambria',
          lineHeight: 1.1,
          width: '120px',
          margin: 'auto',
        },
      },
      {
        type: 'table',
        style: {
          fontSize: '11px',
          fontWeight: '500',
          fontFamily: 'Cambria',
        },
        tableHeader: [
          {
            type: 'text',
            value: 'Desc',
            style: { textAlign: 'left', width: '40px' },
          },
          'Qty',
          'Price',
          {
            type: 'text',
            value: 'Amount',
            style: { textAlign: 'right' },
          },
        ],
        tableBody: [],
        tableFooter: [],
        tableHeaderStyle: {
          borderBottom: '2px solid #000',
        },
        tableBodyStyle: {
          borderBottom: '1px solid #fff',
        },
        tableFooterStyle: {},
      },
      {
        type: 'text',
        value: 'Item 1',
        style: {
          fontSize: '11px',
          textAlign: 'left',
          fontWeight: '500',
          fontFamily: 'Cambria',
          marginTop: '5px',
        },
      },
      {
        type: 'table',
        style: {
          fontSize: '11px',
          fontWeight: '500',
          fontFamily: 'Cambria',
          lineHeight: 1,
          border: 'none',
        },
        tableHeader: [],
        tableBody: [
          [
            {
              type: 'text',
              value: '',
              style: { textAlign: 'center', width: '45px' },
            },
            {
              type: 'text',
              value: '1',
              style: { textAlign: 'center' },
            },
            {
              type: 'text',
              value: '10.00',
              style: { textAlign: 'center' },
            },
            {
              type: 'text',
              value: '10.00',
              style: { textAlign: 'right' },
            },
          ],
        ],
        tableFooter: [],
        tableHeaderStyle: {},
        tableBodyStyle: {
          borderTop: 'none',
        },
        tableFooterStyle: {},
      },
      {
        type: 'table',
        style: {
          fontSize: '11px',
          fontWeight: '500',
          fontFamily: 'Cambria',
          borderTop: '2px solid #000',
        },
        tableHeader: [],
        tableBody: [
          [
            {
              type: 'text',
              value: 'Subtotal',
              style: { textAlign: 'left', width: '70px' },
            },
            ':',
            {
              type: 'text',
              value: '10.00',
              style: { textAlign: 'right', width: '80px' },
            },
          ],
        ],
        tableFooter: [],
        tableHeaderStyle: {},
        tableBodyStyle: {
          borderBottom: 'none',
          lineHeight: 0.5,
        },
        tableFooterStyle: {},
      },
    ]
    const data = {
      printData: printData,
      printerName: printerData.name,
      pageSize: `${printerData.pageSize}mm`,
      pageWidth: `${printerData.pageWidth}px`,
    }
    const result = await this.$axios.post(`/print`, data)

    return result
  }

  async setCurrentOrder(orderId: string) {
    const currentOrder = await this.getOrder(orderId)
    await db.auth.updateUserSettings({ currentOrderId: orderId })
    localStorage.setItem('currentOrderId', orderId)

    return currentOrder
  }

  async createCustomer(customerName: string) {
    const customerCheck = await db
      .query('customers')
      .filter('name', '==', customerName)
      .exists()
    if (customerCheck == false) {
      await customersRef.push({ name: customerName })
    }
  }

  async getAllCustomers() {
    let result: NotWellDefinedObject[] = []

    const customers = await db.query('customers').get()

    if (customers) {
      customers.forEach((customer) => {
        // this.removeOrder(customer.key)
        if (customer.key != 'null') {
          const id = customer.key
          const value = customer.val()

          result.push({ id, ...value })
        }
      })
    } else {
      result = []
    }

    return result
  }
}

const orderPlugin: Plugin = function (context, inject) {
  inject('order', new OrderPlugin(context))
}

export default orderPlugin
