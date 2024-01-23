<template>
  <main>
    <div class="progress fixed-top" style="margin-top:81px;">
      <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
        aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="container">
      <h2 class="mb-4">회원들에게 보여줄 정보를 입력하세요</h2>
      <div class="container">
        <form @submit.prevent="proceedToNextPage">
          <div>
            <h4>프로필 사진 등록</h4>
            <p style="font-size: 10px">최대 3장 까지 가능합니다</p>
            <div class="upload-container">
              <div class="main-image-container">
                <img v-if="mainImage" :src="mainImage.url" alt="Main Image">
                <div class="upload-button" v-else>
                  <i class="fas fa-plus"></i>
                  <input type="file" accept="image/*" @change="handleMainImageUpload" hidden>
                </div>
                <span>대표이미지</span>
              </div>
              <div class="uploaded-images ">
                <div v-for="(image) in uploadedImages" :key="image.id" class="uploaded-image"
                  @click="setMainImage(image.id)">
                  <img :src="image.url" :alt="'Uploaded Image ' + image.id">
                  <button class="delete-button1" @click="deleteImage(image.id)">X</button>
                </div>
                <label for="image-upload" class="upload-button"
                  v-if="uploadedImages.length < 3 || uploadedImages.length === 0">
                  <i class="fas fa-plus"></i>
                  <span>사진 추가</span>
                </label>
                <input type="file" accept="image/*" @change="handleImageUpload" multiple id="image-upload" hidden>
              </div>
            </div>
          </div>

          <div class="mt-5">
            <h4>근무하시는 지역</h4>
            <p style="font-size: 10px">주변에 있는 회원과 매칭 해드려요~!!</p>
            <div>
              <input type="text" id="region" placeholder="도로명 주소" readonly class="address-input" @click="search"
                v-model="region">
              <input type="text" placeholder="헬스장 이름 입력" style="width: 150px;" v-model="gym">
            </div>
          </div>
          <div class="mt-5">
            <h4>연락 가능 시간</h4>
            <p style="font-size: 10px">연락이 가능한 시간을 알려 주세요~!!</p>
            <div class="time-select-container" style="text-align: center;">
              <select v-model="starttime" class="time-select">
                <option disabled value="">시간 선택</option>
                <option v-for="hour in 24" :key="hour" :value="hour">{{ formatTime(hour) }}</option>
              </select>
              <span class="time-select-label">부터</span>
              <select v-model="endtime" class="time-select">
                <option disabled value="">시간 선택</option>
                <option v-for="hour in 24" :key="hour" :value="hour">{{ formatTime(hour) }}</option>
              </select>
              <span class="time-select-label">까지</span>
            </div>
          </div>
          <div class="mt-5">
            <h4>메인 화면에서 보일 간단 자기소개</h4>
            <div>
              <textarea style="width: 750px; height: 30px;" v-model="trainercomment"></textarea>
            </div>
          </div>
          <div class="mt-5">
            <h4>프로필 화면에서 보일 자기소개</h4>
            <textarea style="width: 750px; height: 300px;" v-model="trainerintro"></textarea>
          </div>
          <div class="mt-5">
            <h4>수상 경력 등록(선택)</h4>
            <div class="contest-container" style="text-align: center;">

              <div v-for="(contest, index) in awards" :key="index" class="contest-row">
                <input type="text" class="contest-input" v-model="contest.name" placeholder="수상 내용">
                <input type="text" class="contest-input" v-model="contest.rank" placeholder="등수">
                <button type="button" class="delete-button" @click="removeContest(index)"
                  v-if="index !== awards.length - 1">X</button>
                <button type="button" class="add-button" @click="addContest" v-if="index === awards.length - 1">+</button>
              </div>
            </div>
          </div>
          <button type="submit" style="width:750px">회원 가입 요청</button>
        </form>
      </div>
    </div>

  </main>
</template>
  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  /* 페이지의 너비를 제한합니다 */
  margin: 0 auto;
  /* 페이지를 중앙에 위치시킵니다 */
  padding: 20px;
  background: #f9f9f9;
  /* 배경색을 설정합니다 */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 컨테이너에 그림자를 추가합니다 */
}

.section-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.upload-container,
.contest-container {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.upload-container {
  display: flex;
  /* 요소들을 가로로 배치합니다 */
  align-items: center;
  justify-content: center;
}

.main-image-container {
  width: 200px;
  height: 200px;
  border: 5px #743b15be;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 10px;

}

.main-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-button {
  cursor: pointer;
  padding: 10px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

}

.upload-button i {
  margin-right: 5px;
}

.uploaded-images,
.contest-row {
  display: flex;
  /* 요소들을 가로로 배치합니다 */
}

.uploaded-image,
.award-input-group {
  margin-right: 10px;
  /* 요소들 사이의 간격을 설정합니다 */
}

.uploaded-images {
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
}

.uploaded-image {
  margin-right: 10px;
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.uploaded-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-button,
.delete-button,
.add-button {
  cursor: pointer;
  margin-top: 5px;
  /* 버튼 상단의 간격을 설정합니다 */
}

.delete-button1 {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 50%;
}

.delete-button {
  position: relative;

  padding: 5px 10px;
  background-color: #ff0000;
  /* 배경색을 붉은색으로 설정 */
  color: #fff;
  /* 글자색을 흰색으로 설정 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 0px;

}

.add-button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 0px;
}

.address-input,
.contest-input,
.textarea {
  width: 100%;
  /* 입력 필드의 너비를 100%로 설정합니다 */
  padding: 10px;
  margin-bottom: 10px;
  /* 입력 필드 아래의 간격을 설정합니다 */
  border: 1px solid #ddd;
  border-radius: 4px;
}

.time-select-container {
  display: flex;
  /* 시간 선택 드롭다운을 가로로 배치합니다 */
  align-items: center;
  justify-content: space-between;
  /* 요소들 사이에 공간을 동일하게 배분합니다 */
}

.time-select {
  margin-right: 10px;
  /* 드롭다운 사이의 간격을 설정합니다 */
}

.time-select-label {
  margin: 0 5px;
  /* 라벨 사이의 간격을 설정합니다 */
}

.submit-button {
  width: 50%;
  /* 제출 버튼의 너비를 설정합니다 */
  padding: 10px 0;
  /* 제출 버튼의 상하 패딩을 설정합니다 */
  background-color: #007bff;
  /* 제출 버튼의 배경색을 설정합니다 */
  color: white;
  /* 제출 버튼의 글자색을 설정합니다 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #0056b3;
  /* 마우스 오버 시 배경색을 변경합니다 */
}

/* 반응형 웹 디자인을 위한 미디어 쿼리 */
@media (max-width: 768px) {

  .uploaded-images,
  .contest-row {
    flex-direction: column;
    /* 모바일 화면에서는 요소들을 세로로 배치합니다 */
  }

  .time-select-container {
    flex-direction: column;
    /* 모바일 화면에서 시간 선택 드롭다운을 세로로 배치합니다 */
  }

  .submit-button {
    width: 100%;
    /* 모바일 화면에서 제출 버튼의 너비를 100%로 설정합니다 */
  }

}
</style>
<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  data() {
    return {
      uploadedImages: [], // 업로드된 이미지들을 저장하는 배열
      mainImage: null,
      awards: [
        { name: '', rank: '' }
      ],
      // awards: [],
      region: "",
      starttime: '',
      endtime: '',
      trainercomment: '',
      trainerintro: '',
      gym: ''
    };
  },
  mounted() {
    this.mainImage = { url: require("../../../assets/img/defaultImage.jpeg") };
  },
  computed: {
    progress() {
      let count = 0;
      const totalFields = 7; // 총 필드 수

      if (this.mainImage) count++;
      if (this.region) count++;
      if (this.starttime) count++;
      if (this.endtime) count++;
      if (this.trainercomment) count++;
      if (this.trainerintro) count++;
      if (this.gym) count++;

      if (count == totalFields) {
        return 100; // 필요한 모든 정보가 입력되었고, 비밀번호와 비밀번호 확인이 일치할 때 25를 반환하여 게이지바를 채웁니다.
      } else {
        return 75; // 그 외의 경우에는 0을 반환하여 게이지바를 비웁니다.
      }
    },
  },
  methods: {
    handleMainImageUpload(event) {
      const file = event.target.files[0];
      const imageObject = {
        name: "",
        url: FileReader.createObjectURL(file),
      };
      this.mainImage = imageObject;
    },
    handleImageUpload(event) {
      const files = event.target.files; // 선택한 파일들 가져오기
      const maxImages = 3;
      const remainingSlots = maxImages - this.uploadedImages.length;
      const uploadCount = Math.min(files.length, remainingSlots);

      for (let i = 0; i < uploadCount; i++) {
        const file = files[i];
        const imageObject = {
          id: this.uploadedImages.length + 1, // 이미지 식별을 위한 ID
          url: URL.createObjectURL(file), // 업로드된 이미지의 URL
        };

        this.uploadedImages.push(imageObject);
        if (this.uploadedImages.length === 1) {
          this.mainImage = imageObject;
        }
      }

      // 파일 선택 버튼 초기화
      event.target.value = '';
    },
    deleteImage(imageId) {
      this.uploadedImages = this.uploadedImages.filter((image) => image.id !== imageId);

      if (this.mainImage && this.mainImage.id === imageId) {
        if (this.uploadedImages.length > 0) {
          const currentIndex = this.uploadedImages.findIndex((image) => image.id === imageId);
          const nextIndex = (currentIndex + 1) % this.uploadedImages.length;
          this.mainImage = this.uploadedImages[nextIndex];
        } else {
          this.mainImage = null;
        }
      }
    },
    setMainImage(imageId) {
      this.mainImage = this.uploadedImages.find((image) => image.id === imageId);
    },
    addContest() {
      if (this.awards.length < 5) {
        // this.awards.push({ name: '', rank: '' });
        this.awards.push();
      } else {
        alert('수상 경력은 최대 5개까지만 가능합니다.');
      }
    },
    removeContest(index) {
      if (this.awards.length > 1) {
        this.awards.splice(index, 1);
      } else {
        alert('최소 한 개의 수상 경력은 필요합니다.');
      }
    },
    search() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          var roadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ''; // 참고 항목 변수
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          this.region = roadAddr;
          console.log(this.region);
        }
      }).open();
    },
    formatTime(hour) {
      return hour < 10 ? `오전 0${hour}시` : hour < 12 ? `오전 ${hour}시` : hour === 12 ? `오후 ${hour}시` : `오후 ${(hour - 12).toString().padStart(2, '0')}시`;
    },
    // submitForm() {
    //   let count = 0;
    //   const totalFields = 7; // 총 필드 수

    //   if (this.mainImage) count++;
    //   if (this.region) count++;
    //   if (this.starttime) count++;
    //   if (this.endtime) count++;
    //   if (this.trainercomment) count++;
    //   if (this.trainerintro) count++;
    //   if (this.gym) count++;

    //   if (count == totalFields) {
    //     this.$router.push('/pt_sign_finish'); // 이름 입력 페이지로 이동
    //   }
    // },

    async proceedToNextPage() {
      try {
        const isValid = 1;
        const data = {
          region: this.region,
          trainercomment: this.trainercomment,
          trainerintro: this.trainerintro,
          awards: this.awards,
          starttime: this.starttime,
          endtime: this.endtime,
          mainimage: this.mainImage,
          gym: this.gym,

        };
        if (isValid) {
          const signup = await Swal.fire({
            title: "",
            text: "가입하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
          })
          if (signup.isConfirmed) {
            this.$emit("nextPage", data);
          } else {
            this.$swal("", "취소하셨습니다.");
          }
        } else {
          this.$swal("유효하지 않은 경로입니다.");
        }
      } catch (e) {
        console.log(e);
      }
    },

  }
}

</script>