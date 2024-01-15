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
      event.preventDefault();
      this.unhighlight();

      const files = Array.from(event.dataTransfer.files);
      const remainingSlots = this.maxImages - this.localUploadedImages.length;
      const filesToUpload = files.slice(0, remainingSlots);

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
