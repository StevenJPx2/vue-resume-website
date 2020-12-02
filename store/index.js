export const state = () => ({
  activePage: 0,
  title: 'Steven John'
})

export const mutations = {
  setActive(state, active) {
    state.activePage = active
  },
  setTitle(state, newTitle){
    state.title = newTitle
  }
}
