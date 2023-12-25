<template>
  <div class="drag-drop-container">
    <div
      class="drag-drop"
      @dragover.prevent
      @dragenter="highlight"
      @dragleave="unhighlight"
      @drop.prevent="handleDrop"
      :class="{ 'drag-over': isDragOver }"
    >
      <p>이미지를 드래그 앤 드랍하세요</p>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileInput" />
      <button class="" @click="triggerFileInput">파일 선택</button>
    </div>
    <div v-if="uploadedImage" class="preview">
      <img :src="uploadedImage" alt="Uploaded Preview" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragOver: false,
      uploadedImage: null,
    };
  },
  methods: {
    highlight() {
      this.isDragOver = true;
    },
    unhighlight() {
      this.isDragOver = false;
    },
    handleDrop(event) {
      this.unhighlight();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.handleFile(files[0]);
      }
    },
    handleFileInput() {
      const fileInput = this.$refs.fileInput;
      const files = fileInput.files;
      if (files.length > 0) {
        this.handleFile(files[0]);
      }
    },
    handleFile(file) {
      if (file.type.startsWith('image/')) {
        this.previewImage(file);
      } else {
        alert('이미지 파일을 선택하세요.');
      }
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result;
      };
      reader.readAsDataURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style scoped>
button {
  background-color: #e5f5f2;
  color: #085c57;
  border: none;
  border-radius: 1px;
  padding: 10px 20px;
}

.drag-drop-container {
  display: flex;
  flex-direction: column;
}

.drag-drop {
  border: 2px dashed #085c57;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.drag-over {
  border-color: #2196F3;
}

.preview {
  margin-top: 20px;
}

.preview img {
  max-width: 100%;
  max-height: 200px;
}
</style>
