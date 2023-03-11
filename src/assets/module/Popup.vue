<!--弹窗-->
<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <p>{{ title }}</p>
        <i class="iconfont icon-close my-icon-btn" @click="hideModal"></i>
      </div>
      <div class="modal-main">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "yh-popup",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
  },
  methods: {
    hideModal() {
      this.$emit('hideModal')
    },

    submit() {
      this.$emit('submit')
    },
  }
}
</script>

<style scoped>
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
  }
  .modal-container {
    background: #fff;
    min-height: 144px;
    min-width: 400px;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .modal-header {
    height: 56px;
    border-bottom: #F5F5F5FF 1px solid;
    color: #000;
    line-height: 56px;
    padding: 0 10px;
  }
  .modal-header p {
    display: inline-block;
  }

  .modal-header i {
    float: right;
    color: #7a7c85;
  }
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-top: 1px solid #ddd;
  }
  .modal-footer button {
    width: 100px;
  }
  .modal-main {
    padding: 15px 40px;
  }
</style>
