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
            <button>제출</button>

      <!-- 카테고리별 드래그 앤 드롭 영역 -->
        <div class="categories">
          <div v-for="(images, category) in categorizedImages" :key="category">
            <div class="category-title-container">
              <h1 class="badge rounded-pill bg-secondary category-name">{{ category }}</h1>
            </div>
            <!-- 카테고리별 이미지 드래그 앤 드롭 영역 -->
            <div class="category" @dragover.prevent="handleDragOver(category)"
                 @drop.prevent="handleDrop()">

            <div
                :class="['drag-area', { 'over': draggedOverCategory === category }]"

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
      </div>
      <div>
        <input type="file" @change="handleImageUpload" />
        <div v-if="photoTakenDate">
          <h3>사진 찍은 날짜 및 시간: {{ formattedExifData }}</h3>
        </div>
      </div>
    </section>
    </div>
  </main>

</template>

<script>
import sha256 from 'js-sha256';
import EXIF from 'exif-js';

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
      photoTakenDate: null,
      time: "아침",
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
    // 특정 카테고리에서 이미지를 삭제합니다
    removeImage(category, index) {
      console.log("category : " + category)
      console.log("index : " + index)
      this.categorizedImages[category].splice(index, 1);
      this.uploadedImageHashes.splice(index, 1);
      console.log(this.uploadedImageHashes.length)
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

      // category가 문자열이 아닌 경우 무시 (DragEvent 객체 방지)
      if (typeof category !== 'string') {
        return;
      }

      // 현재 카테고리가 이전에 저장된 카테고리와 다른 경우에만 업데이트
      if (this.draggedOverCategory !== category) {
        this.draggedOverCategory = category;
        console.log("this.draggedOverCategory asd : " + this.draggedOverCategory);
      }
    },
    async handleDrop() {
      event.preventDefault();
      event.stopPropagation(); // 이벤트 전파 중단
      console.log("handleDrop 실행")
      const files = event.dataTransfer.files;
      console.log("files : " + files)
      if (files.length > 0) {
        await this.handleFiles(files);
      } else {
        // 아무것도 하지 않는다.
      }

      this.resetDragState();
    },
    resetDragState() {
      console.log("이게 실행 된다고?")
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
      var targetCategory = null
      if (this.draggedOverCategory) {
        targetCategory = this.draggedOverCategory
      }else{
        targetCategory = "아침"
      }
      for (const file of files) {
        await this.hashFile(file).then(hash => {
          if (!this.uploadedImageHashes.includes(hash)) {
            // 새로운 이미지 업로드 처리
            this.uploadedImageHashes.push(hash);
            this.uploadImage(file, targetCategory);
          } else {
            // 이미지가 현재 속해 있는 카테고리와 인덱스를 찾음
            let currentCategory = this.draggedFromCategory;
            let imageIndex = this.draggedImageIndex;

            console.log("currentCategory : " + currentCategory)
            // 이미지를 새로운 카테고리로 이동
            if (currentCategory !== null && imageIndex !== -1) {
              const movedImage = this.categorizedImages[currentCategory].splice(imageIndex, 1)[0];
              if (!this.categorizedImages[targetCategory]) {
                this.categorizedImages[targetCategory] = [];
              }
              this.categorizedImages[targetCategory].push(movedImage);
            }
          }
        });
      }
      this.resetDragState();
    },
    uploadImage(file, targetCategory) {
      // FileReader 객체 생성
      const reader = new FileReader();

      // 파일 읽기가 완료되면 실행될 콜백 함수 정의
      reader.onload = (e) => {
        const imageUrl = e.target.result; // 읽은 파일의 내용 (Base64 인코딩된 URL)
        console.log("this.draggedOverCategory : "+  this.draggedOverCategory)
        // 현재 위치한 마우스 카테고리에 추가
        if (!this.categorizedImages[targetCategory]) {
          this.categorizedImages[targetCategory] = [];
        }
        this.extractExifData(file).then(label => {
          this.categorizedImages[label].push(imageUrl);
        }).catch(error => {
          console.error(error); // 오류 처리
        });


        // 추가적인 이미지 처리 로직 (예: 미리보기 생성, 서버로 업로드 등)
        // ...
      };

      // 파일 읽기 에러 처리
      reader.onerror = (error) => {
        console.error("File reading error: ", error);
        // 에러 처리 로직
      };

      // 파일 읽기 시작
      reader.readAsDataURL(file); // Base64 인코딩된 데이터 URL로 파일을 읽음
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
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          const hash = sha256(arrayBuffer);
          resolve(hash);
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      event.stopPropagation();
      const imageFile = event.target.files[0];
      if (imageFile) {
        this.extractExifData(imageFile);
      }
    },
    // 사진 찍은 날짜 및 시간 추출
    extractExifData(imageFile) {
      return new Promise((resolve, reject) => {
        EXIF.getData(imageFile, () => {
          try {
            const photoTakenDate = EXIF.getAllTags(imageFile)["DateTimeOriginal"];
            if (!photoTakenDate) {
              reject("날짜 정보를 찾을 수 없음");
              return;
            }

            // "2020:11:10 12:12:45" 형식의 문자열에서 시간과 분을 추출
            const timePart = photoTakenDate.split(' ')[1];
            const [hours, minutes] = timePart.split(':').map(Number);
            const totalMinutes = hours * 60 + minutes; // 총 분으로 변환

            // 시간대에 따라 라벨을 할당
            let label;
            if (totalMinutes >= 240 && totalMinutes < 630) {
              label = '아침';
            } else if (totalMinutes >= 630 && totalMinutes < 900) {
              label = '점심';
            } else if (totalMinutes >= 900 && totalMinutes < 1020) {
              label = '간식';
            } else if (totalMinutes >= 1020 && totalMinutes < 1260) {
              label = '저녁';
            } else {
              label = '기타';
            }

            resolve(label);
          } catch (error) {
            reject("EXIF 데이터 처리 중 오류 발생");
          }
        });
      });
    },
  },
  computed: {
    formattedExifData() {
      return JSON.stringify(this.photoTakenDate, null, 2);
    }
  },
};
</script>

<style lang="scss" scoped>
.category-title-container {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto; /* 필요에 따라 조정 가능 */
  /* 추가적인 스타일링 */
}
.category-name {
  flex-shrink: 0; /* 카테고리 이름의 크기가 줄어들지 않도록 설정 */
  margin-right: 20px; /* 이름과 이미지 사이의 간격을 설정 */
  font-size: 24px;

}
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
  flex-direction: column; /* 세로 정렬 */
  box-sizing: border-box;
  width: 100%; /* 화면 전체 너비 */
  align-items: flex-start; /* 좌측 정렬 */
}

.category {
  flex-grow: 1; /* 각 카테고리가 공간을 균등하게 차지하도록 함 */
  padding: 10px; /* 내부 패딩 추가 */
  box-sizing: border-box; /* 패딩과 보더를 너비에 포함 */
  display: flex; /* flexbox 레이아웃 적용 */
  flex-direction: row; /* 자식 요소들을 가로로 정렬 */
  align-items: center; /* 자식 요소들을 가로로 늘림 */
  min-height: 200px; /* 최소 높이 설정 */
  margin: 10px;
  //max-width: 22%;
  min-width: 22%;
}

.drag-area {
  display: flex; /* flex 컨테이너로 설정 */
  flex-direction: row; /* 자식 요소들을 가로로 나열 */
  flex-wrap: nowrap; /* 자식 요소들이 다음 줄로 넘어가지 않도록 설정 */
  overflow-x: auto; /* 내용이 넘칠 경우 스크롤 가능하게 설정 */
  flex-grow: 1; /* drag-area가 남은 공간을 모두 차지하도록 함 */
  align-items: stretch;

}
.over {
  background-color: lightblue; /* 드래그 오버 시 시각적 피드백 */
}

.uploaded-image {
  border: 2px solid red; /* 붉은 색 테두리 */
}

.image-item {
  position: relative;
  flex-shrink: 0; /* 이미지 크기가 줄어들지 않도록 설정 */
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
