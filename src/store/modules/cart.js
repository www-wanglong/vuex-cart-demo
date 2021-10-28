const state = {
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || []
}
// 计算属性
const getters = {
  totalCount (state) {
    return state.cartProducts.reduce((sum, product) => sum + product.count, 0)
  },
  totalPrice (state) {
    return state.cartProducts.reduce((sum, product) => sum + product.totalPrice, 0)
  },
  checkedCount (state) {
    return state.cartProducts.reduce((sum, product) => {
      if (product.isChecked) {
        sum += product.count
      }
      return sum
    }, 0)
  },
  checkedPrice (state) {
    return state.cartProducts.reduce((sum, product) => {
      if (product.isChecked) {
        sum += product.totalPrice
      }
      return sum
    }, 0)
  }
}
const mutations = {
  addToCart (state, product) {
    // 1. count isChecked
    // 2. 数量加1
    const existProduct = state.cartProducts.find(item => item.id === product.id)
    if (existProduct) {
      existProduct.count++
      existProduct.isChecked = true
      existProduct.totalPrice = existProduct.count * existProduct.price
    } else {
      state.cartProducts.push({
        ...product,
        count: 1,
        isChecked: true,
        totalPrice: product.price
      })
    }
  },
  deleteFromCart (state, productId) {
    const index = state.cartProducts.findIndex(product => product.id === productId)
    index !== -1 && state.cartProducts.splice(index, 1)
  },
  updateAllProductChecked (state, checked) {
    state.cartProducts.forEach(product => {
      product.isChecked = checked
    })
  },
  updateProductChecked (state, { checked, productId }) {
    const product = state.cartProducts.find(pro => pro.id === productId)
    product && (product.isChecked = checked)
  },
  updateProduct (state, { count, productId }) {
    const product = state.cartProducts.find(pro => pro.id === productId)
    if (product) {
      product.count = count
      product.totalPrice = product.count * product.price
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
