import { Plugin, Context } from '@nuxt/types'

export class NotifierPlugin {
  private _notifierState: NotWellDefinedObject = {
    isNotifierEnabled: false,
  }

  constructor(private context: Context) {}

  set notifierState(updateValue: NotWellDefinedObject) {
    this._notifierState = { ...this._notifierState, ...updateValue }
    this._notifierState.isNotifierEnabled = true
  }

  get notifierState() {
    return this._notifierState
  }
}

const notifierPlugin: Plugin = function (context, inject) {
  inject('notifier', new NotifierPlugin(context))
}

export default notifierPlugin
