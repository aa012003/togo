<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination custom-pagination">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a class="page-link" aria-label="Previous" @click="getProducts(pages.current_page - 1)"
        :style="{ cursor: !pages.has_pre ? 'not-allowed' : 'pointer' }">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages"
        :key="page + 123"
      >
      <a class="page-link" @click="getProducts(page)" :style="{ cursor: 'pointer' }">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a class="page-link" aria-label="Next" @click="getProducts(pages.current_page + 1)"
         :style="{ cursor: !pages.has_next ? 'not-allowed' : 'pointer' }">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  `
</template>

<script>
export default { props: ['pages', 'getProducts'] };
</script>
