<template>
  <div class="drag-drop-container">
    <div
      class="drag-drop"
      @dragover.prevent="highlight"
      @dragenter="highlight"
      @dragleave="unhighlight"
      @drop.prevent="handleDrop"
      :class="{ 'drag-over': isDragOver }"
    >
      <div class="upload-instructions">
        <p>이미지를 드래그 앤 드랍하세요 (최대 {{ maxImages }} 개)</p>
        <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileInput" />
        <button @click="triggerFileInput">파일 선택</button>
      </div>

      <div class="card-container">
        <div v-for="(image, index) in localUploadedImages" :key="index" class="card" @click="toggleSelection(index)">
          <img class="card-img-top" :src="image" alt="Uploaded Preview" />
          <button v-if="selectedImageIndex === index" class="delete-btn" @click.stop="removeImage(index)">
            <img src="../../assets/img/휴지통.png" style="width: 30px;">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sha256 from 'js-sha256';
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
      uploadedImageHashes: [], // 해시를 저장할 배열 초기화
      selectedImageIndex: null, // 선택된 이미지의 인덱스
    };
  },
  methods: {
    toggleSelection(index) {
      if (this.selectedImageIndex === index) {
        // 이미 선택된 경우, 선택 해제
        this.selectedImageIndex = null;
      } else {
        // 선택되지 않은 경우, 선택
        this.selectedImageIndex = index;
      }
    },
    highlight() {
      this.isDragOver = true;
    },
    unhighlight() {
      this.isDragOver = false;

    },
    handleDrop(event) {
      event.preventDefault();
      this.unhighlight();

      const files = Array.from(event.dataTransfer.files);
      const remainingSlots = this.maxImages - this.localUploadedImages.length;
      const filesToUpload = files.slice(0, remainingSlots);
      if(remainingSlots < files.length) {
        this.$swal('', '5장까지만 등록할 수 있습니다.', 'warning');
      }
      const processedImages = []; // 처리된 이미지들을 저장할 배열

      Promise.all(filesToUpload.map((file) => {
        return new Promise((resolve, reject) => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              processedImages.push(e.target.result);
              resolve();
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }
        });
      })).then(() => {
        // 모든 이미지 처리가 완료된 후
        this.localUploadedImages.push(...processedImages);
        this.$emit('image-uploaded', processedImages);
      });
    }
    ,
    handleFileInput() {
      // 파일 입력 요소의 참조를 가져옵니다.
      const fileInput = this.$refs.fileInput;
      // 파일 입력 요소가 존재하고 파일들이 있는지 확인합니다.
      if (fileInput && fileInput.files) {
        // 파일 목록을 배열로 변환합니다.
        const files = Array.from(fileInput.files);
        console.log("files : " + files)
        // 업로드할 수 있는 남은 이미지 슬롯의 수를 계산합니다.
        const remainingSlots = this.maxImages - this.localUploadedImages.length;
        console.log("remainingSlots : " + remainingSlots)
        // 남은 슬롯 수에 따라 업로드할 파일을 제한합니다.
        const filesToUpload = files.slice(0, remainingSlots);
        if(remainingSlots < files.length) {
          this.$swal('', this.maxImages + '장까지만 등록할 수 있습니다.', 'warning');
        }
        // 처리된 이미지를 저장할 배열을 초기화합니다.
        const processedImages = [];

        Promise.all(filesToUpload.map((file) => {
          return new Promise((resolve, reject) => {
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = (e) => {
                processedImages.push(e.target.result);
                resolve();
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            }
          });
        })).then(() => {
          // 모든 이미지 처리가 완료된 후
          this.localUploadedImages.push(...processedImages);
          this.$emit('image-uploaded', processedImages);
        });

      }
    },
    handleFile(file) {
      // 이미지 타입이 맞는지 확인
      if (file.type.startsWith('image/')) {
        // 파일의 내용을 해싱
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          const hash = sha256(arrayBuffer);
          // 해시로 중복 검사
          if (!this.uploadedImageHashes.includes(hash)) {
            // 중복되지 않는 이미지일 경우, 미리보기 생성
            this.previewImage(file);
            this.uploadedImageHashes.push(hash);
          } else {
            alert('중복된 이미지입니다.');
          }
        };
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert('이미지 파일을 선택하세요.');
      }
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        // 이미지 배열에 미리보기 이미지 URL 추가
        this.localUploadedImages.push(imageUrl);
        // 부모 컴포넌트에 이미지 업로드 이벤트를 발생시킵니다.
        this.$emit('image-uploaded', this.localUploadedImages);
      };
      reader.readAsDataURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    removeImage(index) {
      // 지정된 인덱스에서 이미지를 제거합니다.
      this.localUploadedImages.splice(index, 1);
      this.$emit('image-removed', { index, images: this.localUploadedImages });
      this.selectedImageIndex = null; // 선택 해제
    },
  },
};
</script>

<style scoped>



button {
  background-color: #e5f5f2;
  color: #085c57;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #bde0dd;
}

.drag-drop-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130vh;
  min-height: 60vh; /* 최소 높이를 원래 설정한 높이로 지정 */
  max-height: none; /* 최대 높이는 제한 없음 */
  padding: 10px;
  border-radius: 10px;
  background-color: mintcream;
  box-shadow: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff;
  margin-bottom: 30px;
}

.drag-drop {
  border: none;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  width: 100%; /* 전체 너비를 차지하도록 설정 */
  min-height: 60vh; /* 최소 높이를 원래 설정한 높이로 지정 */
  max-height: none; /* 최대 높이는 제한 없음 */
  height: 100%; /* 전체 높이를 차지하도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 상단 정렬 */
  align-items: center; /* 가로 방향에서 중앙 정렬 */
  transition: transform 0.3s ease; /* 애니메이션 효과 추가 */
}

.drag-drop:hover {
  transform: translateY(-5px); /* 호버 시 약간 위로 이동 */
}

.upload-instructions {
  text-align: center;
  padding: 20px;
  color: #333; /* 텍스트 색상 조정 */
  font-weight: bold; /* 텍스트 굵게 */
}

.upload-instructions {
  text-align: center;
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap; /* 다음 줄로 넘어가도록 설정 */
  gap: 20px;
  justify-content: center;
  align-items: start; /* 위에서 아래로 정렬 */
  margin-top: 20px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  width: calc(100% / var(--num-of-images) - 16px); /* 이미지 개수에 따라 너비 조정 */
  max-width: 220px; /* 카드의 최대 너비를 설정 */
  margin-bottom: 20px;
  position: relative;
  border-radius: 8px;
}


.drag-over {
  border-color: #2196F3;
}

.card.selected {
  border: 2px solid #085c57; /* 선택된 이미지에 대한 테두리 스타일 */
}
.delete-btn {
  border: gold;
  position: absolute; /* 삭제 버튼을 카드 상단에 위치시킴 */
  bottom: -20%; /* 상단에서 10px 떨어진 위치 */
  left: 80%; /* 오른쪽에서 10px 떨어진 위치 */
  background: white; /* 배경색 제거 */
  border: none; /* 테두리 제거 */
  padding: 0; /* 패딩 제거 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경 */
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 8px; /* 이미지에도 둥근 모서리 적용 */
}

button {
  background-color: #4CAF50; /* 버튼 색상 변경 */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 버튼 그림자 추가 */
}

button:hover {
  background-color: #45a049; /* 버튼 호버 색상 변경 */
}

</style>

