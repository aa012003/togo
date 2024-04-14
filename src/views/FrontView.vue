<template>
  <div class="bg-white sticky-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand ms-2">
          <img
            src="https://i.imgur.com/2KknpZM.png"
            alt="logo圖片"
            width="50"
            height="50"
            class="d-inline-block align-text-top"
          />
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link">常見問題</RouterLink>
            </li>
            <li class="nav-item">
              <button
          :class="{ active: isActive(`/products?category=${item}`) }"
          @click="navigateTo(`/products`)"
          class="nav-item nav-link text-nowrap px-2"
        >
          所有商品
        </button>
            </li>
            <li v-for="item in categories" :key="item">
              <button
                :class="{ active: isActive(`/products?category=${item}`) }"
                @click="navigateTo(`/products?category=${item}`)"
                class="nav-item nav-link text-nowrap px-2"
              >
                {{ item }}
              </button>
            </li>
          </ul>
          <form class="d-flex me-5">
            <RouterLink to="/cart" class="nav-link ms-3 position-relative">
              <i class="bi bi-cart btn btn-outline-secondary">
                <span
                  class="position-absolute top-0
                  start-100 translate-middle badge rounded-pill bg-danger"
                >
                  <div class="text-center">
                    {{ this?.carts?.length }}
                  </div>
                </span>
              </i>
            </RouterLink>
          </form>
        </div>
      </div>
    </nav>
  </div>
  <routerView />
  <div class="bg-primary py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 text-center text-secondary">
          <h3 style="letter-spacing: 8px">聯絡資訊</h3>
          <p class="text-secondary lh-md" style="letter-spacing: 1px">
            Email : togo1314@gmail.com
            <br />周一到週五 : 10:00-17:00
          </p>
          <a
            href="mailto:togo1314@gmail.com"
            class="btn btn-outline-secondary mt-2 rounded-0 text-secondary"
            >寫信給我們</a
          >
        </div>
      </div>
    </div>
  </div>
  <footer class="bg-secondary">
    <div class="container">
      <div
        class="d-flex align-items-center justify-content-between text-white py-4"
      >
        <p class="mb-0 text-primary">© 2024 LOGO All Rights Reserved.</p>
        <p class="mb-0 text-primary">本站為作品無任何商業行為</p>
        <RouterLink to="/login" class="nav-link text-primary"
          >業者登入</RouterLink
        >
        <ul class="d-flex list-unstyled mb-0 h4">
          <li>
            <a href="#" class="mx-3 text-primary">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </li>
          <li>
            <a href="#" class="mx-3 text-primary"
              ><font-awesome-icon :icon="['fab', 'facebook-square']"
            /></a>
          </li>
          <li>
            <a href="#" class="mx-3 text-primary"
              ><font-awesome-icon :icon="['fab', 'line']" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import * as bootstrap from 'bootstrap';
import { mapActions, mapState } from 'pinia';
import cartStore from '../stores/cartStore';

window.bootstrap = bootstrap;

export default {
  data() {
    return {
      categories: ['童裝', '紗布巾', '用餐器具', '寢具'],
    };
  },
  computed: {
    ...mapState(cartStore, ['carts']),
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    isActive(route) {
      return this.$route.fullPath.includes(route);
    },
    ...mapActions(cartStore, ['getcart']),
  },
  mounted() {
    this.getcart();
  },
};
</script>
