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
      <p>이미지를 드래그 앤 드랍하세요 최대 {{maxImages}} 개</p>
      <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileInput" />
      <button class="" @click="triggerFileInput">파일 선택</button>
    </div>
    <div v-for="(image, index) in localUploadedImages" :key="index" class="preview">
      <img :src="image" alt="Uploaded Preview" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxImages: {
      type: Number,
      default: 5 // 기본값 5로 설정
    },
    uploadedImages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isDragOver: false,
      localUploadedImages: [...this.uploadedImages],
    };
  },
  watch: {
    uploadedImages(newImages) {
      this.localUploadedImages = [...newImages];
    }
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
      const files = Array.from(event.dataTransfer.files);
      const remainingSlots = this.maxImages - this.localUploadedImages.length;

      // 남은 슬롯보다 드롭된 파일 수가 많으면 초과분은 무시
      const filesToUpload = files.slice(0, remainingSlots);

      filesToUpload.forEach(file => {
        if (file.type.startsWith('image/')) {
          this.handleFile(file);
        }
      });
    }
    ,
    handleFileInput() {
      const fileInput = this.$refs.fileInput;
      if (fileInput && fileInput.files) {
        const files = Array.from(fileInput.files);
        const remainingSlots = this.maxImages - this.localUploadedImages.length;

        // 남은 슬롯보다 선택된 파일 수가 많으면 초과분은 무시
        const filesToUpload = files.slice(0, remainingSlots);

        filesToUpload.forEach(file => {
          if (file.type.startsWith('image/')) {
            this.handleFile(file);
          }
        });
      }
    },
    handleFile(file) {
      if (file.type.startsWith('image/') && this.localUploadedImages.length < this.maxImages) {
        this.previewImage(file);
      } else if (!file.type.startsWith('image/')) {
        alert('이미지 파일을 선택하세요.');
      }
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImageSrc = reader.result;
        if (!this.localUploadedImages.includes(newImageSrc)) {
          this.localUploadedImages.push(newImageSrc);
          this.$emit('image-uploaded', this.localUploadedImages);
        }
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
