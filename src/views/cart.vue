<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="cartProducts"
      style="width: 100%"
    >
      <el-table-column
        width="55">
        <template v-slot:header>
          <el-checkbox v-model="checkedAll" size="mini">
          </el-checkbox>
        </template>
        <template v-slot="scope">
          <el-checkbox
            size="mini"
            :value="scope.row.isChecked"
            @change="updateProductChecked({
              productId: scope.row.id,
              checked: $event
            })"
          >
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量">
        <template v-slot="scope">
          <el-input-number
            :value="scope.row.count"
            size="mini"
            @change="updateProduct({
              productId: scope.row.id,
              count: $event
            })"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="小计">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <p>已选 <span>{{ checkedCount }}</span> 件商品，总价：<span>{{ checkedPrice }}</span></p>
      <el-button type="danger">结算</el-button>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapGetters('cart', ['checkedCount', 'checkedPrice']),
    checkedAll: {
      get () {
        return this.cartProducts.every(prod => prod.isChecked)
      },
      set (value) {
        this.updateAllProductChecked(value)
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['updateAllProductChecked', 'updateProductChecked', 'updateProduct'])
  }
}
</script>

<style></style>
