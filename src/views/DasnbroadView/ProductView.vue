<template>
  <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
  <div class="container">
    <div class="text-top mt-4">
      <h2 class="text-secondary">商品列表</h2>
    </div>
    <div class="text-end">
      <button class="btn btn-secondary" @click="openModal('new')">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-end">原價</th>
          <th width="120" class="text-end">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">${{ item.origin_price.toLocaleString() }}</td>
          <td class="text-end">${{ item.price.toLocaleString() }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :pages="pages" :get-products="getProducts"></PaginationComponent>
  </div>
  <!-- Modal -->
  <ProductModal
    :update-product="updateProduct"
    :temp-product="tempProduct"
    ref="productModal"
  ></ProductModal>
  <!-- delProductModal -->
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
  <!-- delProductModal -->
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import PaginationComponent from '../../components/PaginationComponent.vue';
import ProductModal from '../../components/ProductModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      pages: {},
      delProductModal: null,
      isNew: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          Swal.fire(err.data.message);
        });
    },
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.productModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...item };
        if (!Array.isArray(this.tempProduct.imagesUrl)) {
          this.tempProduct.imagesUrl = [];
        }
        this.isNew = false;
        this.$refs.productModal.openModal();
      } else if (status === 'delete') {
        this.tempProduct = item;
        this.delProductModal.show();
      }
    },
    updateProduct() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      let http = 'put';

      if (this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
        http = 'post';
      }

      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          Swal.fire(res.data.message);
          this.$refs.productModal.hideModal();
          this.getProducts(); // 取得所有產品的函式
        })
        .catch((err) => {
          if (
            !this.tempProduct.title
            || !this.tempProduct.category
            || !this.tempProduct.unit
            || !this.tempProduct.origin_price
            || !this.tempProduct.price
          ) {
            // 显示提示消息
            const errorMessage = err.response.data.message.join('\n');
            Swal.fire({
              icon: 'error',
              title: errorMessage,
            });
          }
        });
    },
    delProduct() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      axios
        .delete(url)
        .then((res) => {
          Swal.fire(res.data.message);
          this.delProductModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          Swal.fire(err.data.message);
        });
    },
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)joyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.getProducts();

    this.delProductModal = new Modal(this.$refs.delProductModal);
  },
  components: {
    PaginationComponent,
    ProductModal,
  },
};
</script>
