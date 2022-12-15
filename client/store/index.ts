import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { db } from '~/config/acebase'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
  currentOrder: {} as NotWellDefinedObject,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: (state) => state.name,
  currentOrder: (state) => state.currentOrder,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
  CHANGE_CURRENT_ORDER: (state, newOrder: any) =>
    (state.currentOrder = newOrder),
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchThings({ commit }) {
    const things = await this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
}
