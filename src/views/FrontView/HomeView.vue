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
              <img src="https://i.imgur.com/s6mJNG5.jpeg" alt="廣告圖片" />
            </swiper-slide>
            <swiper-slide>
              <img src="https://i.imgur.com/CYVFaCN.jpeg" alt="廣告圖片" />
            </swiper-slide>
            <swiper-slide>
              <img src="https://i.imgur.com/0mSRur9.jpeg" alt="廣告圖片" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <swiper
  :slidesPerView="3"
  :spaceBetween="30"
  :pagination="{ clickable: true }"
  :modules="modules"
  class="mySwiper"
>
  <swiper-slide :to="`/product/${product.id}`"
      style="text-decoration: none;"
       class="col-md-3 mt-md-4" v-for="product in products" :key="product.id">
       <RouterLink :to="`/product/${product.id}`"
       style="text-decoration: none;"
       class="card border-0 mb-4 position-relative position-relative">
          <img
            :src="product.imageUrl" alt="產品圖片" class="object-fit-cover"
            style="width: 100%; height: auto; aspect-ratio: 1 / 1;"
          />
          <div class="card-body p-0">
            <h4 class="mb-0 mt-4 text-info" width="50px">
              {{ product.title }}
              <button class="btn btn-danger m-2 text-white"
              type="button"
              @click.prevent="addToCart(product.id, qty)">
                <i class="bi bi-cart"/>
              </button>
            </h4>
          </div>
        </RouterLink>
  </swiper-slide>
</swiper>
    </div>
  </div>
  <div class="bg-primary mt-7">
    <div class="container">
      <div class="row justify-content-center">
        <RouterLink to="/products?category=童裝"
          class="col-sm-6 col-md-4 col-lg-2 mt-4 me-2
          d-flex flex-column align-items-center
          d-flex flex-column align-items-center"
          style="text-decoration: none;text-align: center"
        >
          <img
            src="https://images.unsplash.com/photo-1569974641446-22542de88536?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFieSUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
            alt="童裝圖片"
            class="rounded-circle"
            style="width: 160px; height: 160px; object-fit: cover"
          />
          <p
            style="
              margin-top: 10px;
              color: #25466e;
              letter-spacing: 2px;
              font-size: 20px;
            "
          >
            童裝
          </p>
        </RouterLink>
        <RouterLink to="/products?category=紗布巾"
          class="col-sm-6 col-md-4 col-lg-2 mt-4 me-2
          d-flex flex-column align-items-center"
          style="text-decoration: none;text-align: center"
        >
          <img
            src="https://cbu01.alicdn.com/img/ibank/O1CN01Ydofgx1LEn6iS6zt3_!!2215777261268-0-cib.jpg"
            alt="紗布巾圖片"
            class="rounded-circle"
            style="width: 160px; height: 160px; object-fit: cover"
          />
          <p
            style="
              margin-top: 10px;
              color: #25466e;
              letter-spacing: 2px;
              font-size: 20px;
            "
          >
            紗布巾
          </p>
        </RouterLink>
        <RouterLink to="/products?category=寢具"
          class="col-sm-6 col-md-4 col-lg-2 mt-4 me-2
          d-flex flex-column align-items-center"
          style="text-decoration: none;text-align: center"
        >
          <img
            src="https://cbu01.alicdn.com/img/ibank/O1CN01iYCKM61MeGfydmfDs_!!2381291459-0-cib.jpg"
            alt="寢具圖片"
            class="rounded-circle"
            style="width: 160px; height: 160px; object-fit: cover"
          />
          <p
            style="
              margin-top: 10px;
              color: #25466e;
              letter-spacing: 2px;
              font-size: 20px;
            "
          >
            寢具
          </p>
        </RouterLink>
        <RouterLink to="/products?category=用餐器具"
          class="col-sm-6 col-md-4 col-lg-2 mt-4 me-2
          d-flex flex-column align-items-center"
          style="text-decoration: none;text-align: center"
        >
          <img
            src="https://cbu01.alicdn.com/img/ibank/O1CN01auvFVn2AkQl1iKhDf_!!2207932398241-0-cib.jpg?__r__=1663128959567"
            alt="餐具圖片"
            class="rounded-circle"
            style="width: 160px; height: 160px; object-fit: cover"
          />
          <p
            style="
              margin-top: 10px;
              color: #25466e;
              letter-spacing: 2px;
              font-size: 20px;
            "
          >
            用餐器具
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="container my-7">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="text-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1663841374463-8e102ea34609?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style="object-fit: cover "
            height="300px;"
            class="card-img-top"
            alt="禮品包裝圖片"
          />
          <div class="card-body">
            <h4 class="card-title text-info">送禮加值服務</h4>
            <p class="card-text text-secondary">禮品包裝及代寫小卡服務</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center">
          <img
            src="https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style="object-fit: cover"
            height="300px;"
            class="card-img-top"
            alt="配送圖片"
          />
          <div class="card-body">
            <h4 class="card-title text-info">現貨配送</h4>
            <p class="card-text text-secondary">3-5日送達</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1667490647415-d2c05c51e49a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGJhYnl8ZW58MHx8MHx8fDA%3D"
            style="object-fit: cover"
            height="300px;"
            class="card-img-top"
            alt="滿額免運費"
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
import Swal from 'sweetalert2';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cartStore from '@/stores/cartStore';

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
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
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
