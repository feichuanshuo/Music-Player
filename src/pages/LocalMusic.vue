<template>
  <div>
    我是音乐列表
    <input type="file" id="fileInput"  webkitdirectory directory ref="fileRef">
  </div>
</template>

<script>
export default {
  name: "LocalMusic",
  mounted() {
    console.log(this.$refs.fileRef.files);
  },
}
</script>

<style scoped>

</style>
