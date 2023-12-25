<template>
  <main id="main" class="">
    <section>
      <div class="" style="margin: 100px 0 100px 0; text-align: center;">
          <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
          <p class="" style=" white-space: nowrap">사진을 전부 등록 해주시면 저희가 분류해드릴게요.</p>
        </div>
      <div class="multi-image-uploader">
        <div
            class="drag-drop"
            @dragover.prevent
            @dragenter="highlight"
            @dragleave="unhighlight"
            @drop.prevent="handleDrop"
            :class="{ 'drag-over': isDragOver }"
        >
          <p>이미지를 드래그 앤 드랍하세요</p>
          <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileInput"/>
          <button @click="triggerFileInput">파일 선택</button>
        </div>
        <div v-if="uploadedImages.length > 0" class="preview">
          <div v-for="(image, index) in uploadedImages" :key="index" class="image-item">
            <img :src="image" alt="Uploaded Preview"/>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isDragOver: false,
      uploadedImages: [],
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
      this.handleFiles(files);
    },
    handleFileInput() {
      const fileInput = this.$refs.fileInput;
      const files = fileInput.files;
      this.handleFiles(files);
    },
    handleFiles(files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          this.previewImage(file);
        } else {
          alert('이미지 파일을 선택하세요.');
        }
      });
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImages.push(reader.result);
      };
      reader.readAsDataURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.multi-image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drag-drop {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.drag-over {
  border-color: #2196F3;
}

.preview {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  margin: 10px;
}

.image-item img {
  max-width: 100%;
  max-height: 200px;
}
</style>
