<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
      <RouterLink to="/home" class="navbar-brand text-secondary">回到前台</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"/>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/admin/product" class="nav-link">商品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/order" class="nav-link">訂單列表</RouterLink>
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="signOut" class="nav-link">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
   <RouterView v-if="checkSuccess" />
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)joyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        axios.defaults.headers.common.Authorization = token;

        const api = `${VITE_URL}/api/user/check`;
        axios
          .post(api, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true;
          })
          .catch((err) => {
            Swal.fire(err.response.data.message);
            this.$router.push('/login');
          });
      } else {
        Swal.fire('您尚未登入。');
        this.$router.push('/login');
      }
    },
    signOut() {
      const api = `${VITE_URL}/logout`;
      axios
        .post(api)
        .then(() => {
          Swal.fire('登出成功！');
          document.cookie = 'joyToken=; expires=; path=/';
          this.$router.push('/home');
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
  },
  mounted() {
    this.checkAdmin();
  },
};
</script>
