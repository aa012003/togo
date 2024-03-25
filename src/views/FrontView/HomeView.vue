<template>
  <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
  <div class="container">
    <div class="row flex-md-row-reverse flex-column">
      <div class="col-md-12 mt-7">
        <div>
          <swiper
            :spaceBetween="1"
            :centeredSlides="true"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :navigation="true"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide>
              <img src="https://i.imgur.com/s6mJNG5.jpeg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img src="https://i.imgur.com/CYVFaCN.jpeg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img src="https://i.imgur.com/0mSRur9.jpeg" alt="" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <RouterLink :to="`/product/${product.id}`"
      style="text-decoration: none;"
       class="col-md-3 mt-md-4" v-for="product in products" :key="product.id">
        <div class="card border-0 mb-4 position-relative position-relative">
          <img
            :src="product.imageUrl" alt="" class="object-fit-cover"
          />
          <div class="card-body p-0">
            <h4 class="mb-0 mt-4 text-info" width="50px">
              {{product.title}}
              <button class="btn btn-danger m-2 text-white"
              @click.prevent="addToCart(product.id, qty)">
                <i class="bi bi-cart"></i>
              </button>
            </h4>
          </div>
        </div>
      </RouterLink>
      <nav class="d-flex justify-content-center">
        <ul class="pagination" :style="{ cursor: 'pointer' }">
          <li class="page-item"
          :class="{disabled: !pages.has_pre}">
            <a @click="changePage(pages.current_page-1)" class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item " :class="{active: page === pages.current_page}"
          v-for="page in pages.total_pages" :key="page+123">
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{disabled: !pages.has_next}">
            <a @click="changePage(pages.current_page+1)" class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="bg-primary mt-7">
    <div class="container">
      <div class="row justify-content-center">
        <RouterLink to="/products?category=童裝"
          class="col-sm-6 col-md-4 col-lg-2 mt-4 me-2"
          style="text-align: center"
        >
          <img
            src="https://images.unsplash.com/photo-1569974641446-22542de88536?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFieSUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
            alt=""
            class="rounded-circle"
            style="width: 160px; height: 160px; object-fit: cover"
          />
          <p
            style="
              margin-top: 10px;
              color: #25466e;
              letter-spacing: 2px;
              font-size: 13px;
            "
          >
            童裝
          </p>
        </RouterLink>
        <RouterLink to="/products?category=紗布巾"
          class="col-sm-6 col-md-4 col-lg-2 mt-4 me-2"
          style="text-align: center"
        >
          <img
            src="https://cbu01.alicdn.com/img/ibank/O1CN01Ydofgx1LEn6iS6zt3_!!2215777261268-0-cib.jpg"
            alt=""
            class="rounded-circle"
            style="width: 160px; height: 160px; object-fit: cover"
          />
          <p
            style="
              margin-top: 10px;
              color: #25466e;
              letter-spacing: 2px;
              font-size: 13px;
            "
          >
            紗布巾
          </p>
        </RouterLink>
        <RouterLink to="/products?category=寢具"
          class="col-sm-6 col-md-4 col-lg-2 mt-4 me-2"
          style="text-align: center"
        >
          <img
            src="https://cbu01.alicdn.com/img/ibank/O1CN01iYCKM61MeGfydmfDs_!!2381291459-0-cib.jpg"
            alt=""
            class="rounded-circle"
            style="width: 160px; height: 160px; object-fit: cover"
          />
          <p
            style="
              margin-top: 10px;
              color: #25466e;
              letter-spacing: 2px;
              font-size: 13px;
            "
          >
            寢具
          </p>
        </RouterLink>
        <RouterLink to="/products?category=用餐器具"
          class="col-sm-6 col-md-4 col-lg-2 mt-4 me-2"
          style="text-align: center"
        >
          <img
            src="https://cbu01.alicdn.com/img/ibank/O1CN01auvFVn2AkQl1iKhDf_!!2207932398241-0-cib.jpg?__r__=1663128959567"
            alt=""
            class="rounded-circle"
            style="width: 160px; height: 160px; object-fit: cover"
          />
          <p
            style="
              margin-top: 10px;
              color: #25466e;
              letter-spacing: 2px;
              font-size: 13px;
            "
          >
            用餐器具
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="container my-7">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <img
            src="https://plus.unsplash.com/premium_photo-1663841374463-8e102ea34609?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style="object-fit: cover"
            height="300px;"
            class="card-img-top"
            alt=""
          />
          <div class="card-body">
            <h4 class="card-title text-info">送禮加值服務</h4>
            <p class="card-text text-secondary">禮品包裝及代寫小卡服務</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <img
            src="https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style="object-fit: cover"
            height="300px;"
            class="card-img-top"
            alt=""
          />
          <div class="card-body">
            <h4 class="card-title text-info">現貨配送</h4>
            <p class="card-text text-secondary">3-5日送達</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <img
            src="https://plus.unsplash.com/premium_photo-1667490647415-d2c05c51e49a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGJhYnl8ZW58MHx8MHx8fDA%3D"
            style="object-fit: cover"
            height="300px;"
            class="card-img-top"
            alt=""
          />
          <div class="card-body">
            <h4 class="card-title text-info">滿額免運費</h4>
            <p class="card-text text-secondary">滿2000元即可免運費</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cartStore from '../../stores/cartStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      modules: [Autoplay, Navigation, Pagination],
      qty: 1,
      products: {},
      pages: {},
      currentPage: 1,
      selectedCategory: '',
      isLoading: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getProducts() {
      this.isLoading = true;

      const { category = '' } = this.$route.query;
      const selectedCategory = this.selectedCategory || category;

      axios.get(`${VITE_URL}/api/${VITE_PATH}/products?category=${selectedCategory}&page=${this.currentPage}`)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
          this.isLoading = false;
        });
    },
    changePage(page) {
      this.currentPage = page;
      this.getProducts();
    },
    ...mapActions(cartStore, ['addToCart']),
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 30vw;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
