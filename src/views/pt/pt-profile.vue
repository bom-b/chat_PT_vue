<template>
  <div class="body">
    <h3>프로필 관리</h3>
    <hr />
    <input multiple @change="imageUpload()" ref="images" type="file" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      input: {
        image: ''
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    imageUpload() {
      // refs 속성을 이용해 input 태그에 접근함
      this.input.image = this.$refs.images.files
      console.log(this.input.image)
    }
  }
}
</script>
<style>
.body {
  padding: 20px;
}
</style>