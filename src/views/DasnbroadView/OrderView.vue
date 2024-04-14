// AdminOrders.vue
<template>
  <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>訂購人</th>
          <th>電話</th>
          <th>購買款項</th>
          <th>配送地址</th>
          <th>訂單備註</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.user.tel }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ item.user.address }}</td>
            <td>
              {{ item.message }}
            </td>
            <td class="text-right">{{ item.total.toLocaleString() }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-secondary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid" />
    <DelModal ref="delModal" :item="tempOrder" @del-item="delOrder" />
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
    };
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      axios
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;
          this.isLoading = false;
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
          this.isLoading = false;
        });
    },
    openModal(item) {
      this.tempOrder = { ...item };
      const orderComponent = this.$refs.orderModal;
      orderComponent.openModal();
    },
    updatePaid(item) {
      this.isLoading = true;
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      axios
        .put(api, { data: paid })
        .then((res) => {
          this.isLoading = false;
          const orderComponent = this.$refs.orderModal;
          orderComponent.hideModal();
          Swal.fire({
            title: res.data.message,
            icon: 'success',
          });

          this.getOrders(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire(err.response.data.message);
        });
    },
    openDelModal(item) {
      this.tempOrder = { ...item };
      const delCompenent = this.$refs.delModal;
      delCompenent.openModal();
    },
    delOrder() {
      this.isLoading = true;
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`;
      axios
        .delete(api)
        .then(() => {
          this.isLoading = false;
          Swal.fire('已成功刪除');
          const delCompenent = this.$refs.delModal;
          delCompenent.hideModal();
          this.getOrders(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire(err.response.data.message);
        });
    },
  },
  components: { OrderModal, DelModal },
  mounted() {
    this.getOrders();
  },
};
</script>
