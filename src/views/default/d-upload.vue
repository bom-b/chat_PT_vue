<template>

  <main id="main" class="">
    <div
        class="drag-drop"
        @dragover.prevent
        @dragenter="highlight"
        @dragleave="unhighlight"
        @drop.prevent="handleDrop"
        :class="{ 'drag-over': isDragOver }"
    >
    <section>
      <div class="" style="margin: 100px 0 100px 0; text-align: center;">
          <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
          <p class="" style=" white-space: nowrap">사진을 전부 등록 해주시면 저희가 분류해드릴게요.</p>
        </div>
      <div class="multi-image-uploader">


            <p>이미지를 드래그 앤 드롭하세요</p>
        <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileInput"/>
            <button @click="triggerFileInput">파일 선택</button>


      <!-- 카테고리별 드래그 앤 드롭 영역 -->
        <div class="categories">
          <div v-for="(images, category) in categorizedImages" :key="category" class="category">
            <h3>{{ category }}</h3>
            <div
                :class="['drag-area', { 'over': draggedOverCategory === category }]"
                @dragover.prevent="handleDragOver(category)"
                @drop.prevent="handleDrop(category)"
            >
              <div
                  v-for="(image, index) in images"
                  :key="index"
                  draggable="true"
                  @dragstart="handleDragStart(image, category, index)"
                  class="image-item"
              >
                <img :src="image" alt="Uploaded Image" class="uploaded-image"/>
                <button class="delete-button" @click="removeImage(category, index)">X</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
    </div>
  </main>

</template>

<script>
export default {

  data() {
    return {
      isDragOver: false,
      uploadedImages: [],
      uploadedImageHashes: [], // 업로드된 이미지의 해시를 저장할 배열
      originalPosition: null, // 이미지의 원래 위치를 저장할 객체
      draggedImage: null,
      draggedFromCategory: null,
      draggedImageIndex: null,
      draggedOverCategory: null,
      categorizedImages: {
        아침: [], // 이미지 URL 배열
        점심: [],
        저녁: [],
        간식: [],
      },
    };
  },
  mounted() {
    document.addEventListener('dragover', this.handleDragOver, false);
    document.addEventListener('drop', this.handleDrop, false);
  },
  beforeUnmount() {
    document.removeEventListener('dragover', this.handleDragOver, false);
    document.removeEventListener('drop', this.handleDrop, false);
  },
  methods: {
    // 이미지를 업로드하면 아침 카테고리에 추가합니다
    uploadImage(image) {
      this.categorizedImages.아침.push(image);
    },
    // 특정 카테고리에서 이미지를 삭제합니다
    removeImage(category, index) {
      this.categorizedImages[category].splice(index, 1);
      this.uploadedImageHashes.splice(index, 1);
    },
    highlight() {
      this.isDragOver = true;
    },
    unhighlight() {
      this.isDragOver = false;
    },
    handleDragStart(image, category, index) {
      // 드래그 시작 카테고리 존재 여부 확인
      if (!this.categorizedImages[category]) {
        console.error(`Drag start category does not exist: ${category}`);
        return;
      }

      this.draggedImage = image;
      this.draggedFromCategory = category;
      this.draggedImageIndex = index;
    },
    handleDragOver(category) {
      event.preventDefault(); // 드래그 오버 이벤트의 기본 동작을 방지
      this.draggedOverCategory = category;
    },
    handleDrop(category) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.handleFiles(files)
      // 드롭된 카테고리가 존재하는지 확인
      if (!this.categorizedImages[category]) {
        console.error(`Unknown category: ${category}`);
        return;
      }

      // 같은 카테고리로의 드롭은 무시
      if (category === this.draggedFromCategory) {
        return;
      }

      // 이미지 이동 처리
      const movedImage = this.categorizedImages[this.draggedFromCategory].splice(this.draggedImageIndex, 1)[0];
      this.categorizedImages[category].push(movedImage);

      // 드래그 상태 초기화
      this.resetDragState();
    },
    resetDragState() {
      this.draggedImage = null;
      this.draggedFromCategory = null;
      this.draggedImageIndex = null;
      this.draggedOverCategory = null;
    },
    handleFileInput() {
      const fileInput = this.$refs.fileInput;
      const files = fileInput.files;
      this.handleFiles(files);
    },
    async handleFiles(files) {
      console.log(`image`);
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
        const imageUrl = reader.result;
        this.uploadedImages.push(imageUrl);
        this.categorizedImages.아침.push(imageUrl);
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
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh; /* 뷰포트 높이 전체를 사용 */
  position: relative; /* 하위 요소들의 위치 지정 기준 */
}

.categories {
  display: flex;
  flex-wrap: wrap; /* 필요한 경우 요소들이 다음 줄로 넘어가도록 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  gap: 10px; /* 카테고리 간의 간격 설정 */
  box-sizing: border-box;
  width: 100%; /* 화면 전체 너비 */
}

.category {
  flex-grow: 1; /* 각 카테고리가 공간을 균등하게 차지하도록 함 */
  border: 1px dashed #ccc; /* 카테고리 경계 표시 */
  padding: 10px; /* 내부 패딩 추가 */
  box-sizing: border-box; /* 패딩과 보더를 너비에 포함 */
  display: flex; /* flexbox 레이아웃 적용 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  align-items: stretch; /* 자식 요소들을 가로로 늘림 */
  min-height: 200px; /* 최소 높이 설정 */
  margin: 10px;
  max-width: 22%;
  min-width: 22%;
}

.drag-area {
  flex-grow: 1; /* drag-area가 남은 공간을 모두 차지하도록 함 */
  border: 2px solid teal; /* 시각적으로 확인하기 위한 임시 테두리 */
}
.over {
  background-color: lightblue; /* 드래그 오버 시 시각적 피드백 */
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
  font-size: 12px; /* 폰트 크기 조정 */
  width: 20px;     /* 버튼 너비 */
  height: 20px;    /* 버튼 높이 */
  padding: 0;      /* 패딩 제거 또는 조정 */
  border-radius: 50%; /* 원형 버튼을 원한다면 추가 */
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
