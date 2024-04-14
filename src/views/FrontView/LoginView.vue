<template>
  <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
  <div class="container">
    <h2 class="mt-5 text-center">後台登入頁面</h2>
    <div class="row justify-content-center">
      <div class="col-8">
      <h1 class="h3 mt-5 mb-3 font-weight-normal">請先登入</h1>
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              v-model="user.username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3 mb-9" type="submit">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      axios.post(`${VITE_URL}/admin/signin`, this.user)
        .then((res) => {
          this.isLoading = false;
          const { token, expired } = res.data;
          document.cookie = `joyToken=${token}; expires=${new Date(expired)}; path=/`;
          this.$router.push('admin/product');
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
          this.isLoading = false;
        });
    },
  },
};
</script>
