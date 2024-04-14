<template>
    <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
    <div class="container">
    <div class="text-end">
        <h4 class="text-center mt-7"
        v-if="carts && carts.carts && carts.carts.length === 0"
        >目前購物車沒有商品</h4>
        <button class="btn btn-outline-danger mt-3 mb-3"
        type="button" @click="removeAllCart()" v-else>清空購物車</button>
    </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th/>
            <th>圖片</th>
            <th style="width: 300px">品名</th>
            <th style="width: 200px">數量</th>
            <th class="text-end">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td>
              <button type="button"
              class="btn btn-outline-danger btn-sm" @click="removeCartItem(cart.id)">
                <i class="fas fa-spinner fa-pulse" v-if="cart.id === status.removeLoading"/>
                <div>
                  x
                </div>
              </button>
            </td>
            <td>
                <img :src="cart.product.imageUrl"
                alt="產品圖片" class="object-fit-cover" height="100px">
            </td>
            <td>
              {{ cart.product.title }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group">
                  <button type="button" class="btn btn-outline-secondary"
                    @click="cart.qty--;changeCartQty(cart,cart.qty)" :disabled="cart.qty === 1"
                    v-if="cart.qty>1">-</button>

                  <button type="button" class="btn btn-outline-danger"
                  @click="removeCartItem(cart.id)" v-else><svg
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                      viewBox="0 0 16 16">
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5
                        0 0 1-1 0V6a.5.5 0 0
                        1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0
                        0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0
                        1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1
                        1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0
                        1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0
                        0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg></button>

                  <input min="1" type="number" class="form-control text-center "
                   v-model="cart.qty" style="padding-left:20px ;"
                    :disabled="cart.id === status.cartQtyLoading" readonly>

                  <button type="button" class="btn btn-outline-secondary"
                    @click="cart.qty++;changeCartQty(cart,cart.qty)">+</button>

                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
              {{ cart.total }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-end">總計</td>
            <td class="text-end">{{ carts.total }}</td>
          </tr>
          <tr>
            <td colspan="4" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ carts.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- 表單 -->
    <div class="container">
    <div class="my-5 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field id="email" name="email" type="email"
          class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"/>
          <errorMessage name="email" class="invalid-feedback"/>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field id="name" name="姓名" type="text"
          class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="form.user.name"/>
          <errorMessage name="姓名" class="invalid-feedback"/>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field id="tel" name="電話" type="tel" class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話" rules="required|min:8|max:10" v-model.trim="form.user.tel"/>
          <errorMessage name="電話" class="invalid-feedback"/>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field id="address" name="地址" type="text"
          class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address"/>
          <errorMessage name="地址" class="invalid-feedback"/>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control"
          cols="30" rows="10" v-model="form.message"/>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: '',
        },
      },
      status: {
        addCartLoading: '',
        cartQtyLoading: '',
        removeLoading: '',
      },
      carts: {
      },
      isLoading: false,
    };
  },
  methods: {
    changeCartQty(item, qty = 1) {
      const order = {
        product_id: item.product_id,
        qty,
      };
      this.status.cartQtyLoading = item.id;
      axios
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`, { data: order })
        .then(() => {
          this.status.cartQtyLoading = '';
          this.getCart();
        })
        .catch((err) => {
          Swal.fire(err.data.message);
        });
    },
    removeCartItem(id) {
      this.status.removeLoading = id;
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger m-1',
          cancelButton: 'btn btn-outline-danger m-1',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: '確定要刪除嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        reverseButtons: true,
      })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: '已刪除成功',
              icon: 'success',
            });
            axios.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
              .then((res) => {
                Swal.fire(res.data.message);
                this.status.removeLoading = '';
                this.getCart();
              })
              .catch((err) => {
                Swal.fire(err.data.message);
              });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: '已取消刪除',
              icon: 'error',
            });
          }
        });
    },
    removeAllCart() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger m-1',
          cancelButton: 'btn btn-outline-danger m-1',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: '確定要刪除嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        reverseButtons: true,
      })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: '已刪除成功',
              icon: 'success',
            });
            axios.delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
              .then((res) => {
                Swal.fire(res.data.message);
                this.status.removeLoading = '';
                this.getCart();
              })
              .catch((err) => {
                Swal.fire(err.response.data.message);
              });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: '已取消刪除',
              icon: 'error',
            });
          }
        });
    },
    createOrder() {
      const order = this.form;
      axios
        .post(`${VITE_URL}/api/${VITE_PATH}/order`, { data: order })
        .then((res) => {
          Swal.fire(res.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        }).catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    getCart() {
      this.isLoading = true;
      axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.carts = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
