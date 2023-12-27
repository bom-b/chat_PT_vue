<template>
  <div
      class="drag-drop"
      @dragover.prevent
      @dragenter="highlight"
      @dragleave="unhighlight"
      @drop.prevent="handleDrop"
      :class="{ 'drag-over': isDragOver }"
  >
  <main id="main" class="">
    <section>
      <div class="" style="margin: 100px 0 100px 0; text-align: center;">
          <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
          <p class="" style=" white-space: nowrap">사진을 전부 등록 해주시면 저희가 분류해드릴게요.</p>
        </div>
      <div class="multi-image-uploader">


            <p>이미지를 드래그 앤 드롭하세요</p>
        <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileInput"/>
            <button @click="triggerFileInput">파일 선택</button>

            <div v-if="uploadedImages.length > 0" class="preview">
              <div v-for="(image, index) in uploadedImages" :key="index" class="image-item">
                <img :src="image" alt="Uploaded Image" class="uploaded-image"/>
                <button class="delete-button" @click="removeImage(index)">X</button>
              </div>
            </div>

        </div>

    </section>
  </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragOver: false,
      uploadedImages: [],
      uploadedImageHashes: [] // 업로드된 이미지의 해시를 저장할 배열
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
    async handleFiles(files) {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const fileHash = await this.hashFile(file);
          if (!this.uploadedImageHashes.includes(fileHash)) {
            this.uploadedImageHashes.push(fileHash);
            this.previewImage(file);
          }
        } else {
          alert('이미지 파일을 선택하세요.');
        }
      }
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImages.push(reader.result);
      };
      reader.readAsDataURL(file);
    },
    hashFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          resolve(hashHex);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh; /* 뷰포트 높이 전체를 사용 */
  position: relative; /* 하위 요소들의 위치 지정 기준 */
}

.uploaded-image {
  border: 2px solid red; /* 붉은 색 테두리 */
}

.image-item {
  position: relative;
  display: inline-block; /* 또는 필요에 따라 다른 디스플레이 속성 사용 */
}

.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

.multi-image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drag-drop {
  padding: 20px;
  text-align: center;
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
