<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <h2 class="modal-dialog modal-xl">注意!!訂單一但刪除將無法恢復!!</h2>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('del-item')">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '../mixins/modalMixin';

export default {
  props: {
    item: Object,
  },
  emits: ['del-item'],
  mixins: [modalMixin],
};
</script>
