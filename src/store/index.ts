import { createDirectStore } from 'direct-vuex'

const { store } = createDirectStore({
  state: {
    count: 0,
    InputText: '',
    patterns: [{ pattern: '', replace: '' }],
    result: ''
  },
  getters: {
    countString(state) {
      if (state.count === 0) return 'zero'
      if (state.count === 1) return 'once'
      return `${state.count} times`
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    addPattern(state) {
      state.patterns.push({ pattern: '', replace: '' })
    },
    setPattern(state, payload: { index: number; value: string }) {
      state.patterns[payload.index].pattern = payload.value
    },
    setReplace(state, payload: { index: number; value: string }) {
      state.patterns[payload.index].replace = payload.value
    },
    removePattern(state, payload: number) {
      state.patterns.splice(payload, 1)
    },
    setResult(state, payload: string) {
      state.result = payload
    },
    setInputText(state, payload: string) {
      state.InputText = payload
    },
    setExample(state) {
      state.InputText = `      {
        "id": 0,
        "name": "ihsan fajar ramadhan",
        "is_alive_me": true,
      }`
      state.patterns = [
        { pattern: '{|}|^[ ]+', replace: '' },
        { pattern: '^[" ]+(.+)": \\d.+', replace: '$1: number,' },
        { pattern: '^[" ]+(.+)": ".+', replace: '$1: string,' },
        { pattern: '^[" ]+(.+)": .+', replace: '$1: boolean,' }
      ]
    },
    resetState(state) {
      state.InputText = ''
      state.patterns = [{ pattern: '', replace: '' }]
      state.result = ''
    }
  }
})

export default store.original

export type Store = typeof store
export const useStore = (): Store => store
