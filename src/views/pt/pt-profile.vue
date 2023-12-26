<template>
  <h1 class="main">프로필 관리</h1>
  <div class="drag-drop-container m_category">
    <h3>프로필 사진</h3>
    <form class="d-flex">
      <button class="btn btn-save" type="button">저장</button>
    </form>
    <br>
    <div class="drag-drop" @dragover.prevent @dragenter="highlight" @dragleave="unhighlight" @drop.prevent="handleDrop"
      :class="{ 'drag-over': isDragOver }">
      <p>이미지를 드래그 앤 드랍하세요</p>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileInput" />
      <button class="" @click="triggerFileInput">파일 선택</button>
    </div>
    <div v-if="uploadedImage" class="preview">
      <img :src="uploadedImage" alt="Uploaded Preview" />
    </div>
  </div>
  <div class="m_category">
    <h3>수상경력</h3>
    <div class="career">
      <div v-for="(award, index) in awards" :key="index">
        <button @click="removeAward(index)">-</button>
        <input v-model="award.value">
      </div>
      <button @click="addAward">+</button>
    </div>
  </div>
  <div class="m_category">
    <h3>근무지 등록</h3>
    <select class="form-select" v-model="selectedLocation">
      <option value="">선택하세요</option>
      <option value="강남">강남</option>
      <option value="신촌">신촌</option>
      <option value="역삼">역삼</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragOver: false,
      uploadedImage: null,
      awards: []
    };
  },
  methods: {
    addAward() {
      this.awards.push({ value: '' });
    },
    removeAward(index) {
      this.awards.splice(index, 1);
    },
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

<style>
.m_category {
  padding: 20px;
}
</style>
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

.main {
  padding: 20px;
}

.btn {
  margin-left: auto;
}
</style>
