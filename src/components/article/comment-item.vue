<template>
  <div class="comment-item">
      <van-cell title="单元格" value="内容" size="large" />
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
