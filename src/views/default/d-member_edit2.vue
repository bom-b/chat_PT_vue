<template>
  <div class="user-edit-form" style="user-select: none">
    <form @submit.prevent="updateUserInfo" class="form-container">
      <h2 class="form-title">회원 정보 수정</h2>
      <div class="form-row">
        <div>
          <img :src="previewImage ||
            `${this.$s3BaseURL}/normal_user/profile_img/${userInfo.nm_PROFILEIMG}`
            " alt="Profile Preview" class="profile-image" @click="openImagePicker" style="width: 250px" />
          <input ref="profileImageInput" @change="handleImageChange" type="file" id="profileImage" class="form-input"
            style="display: none" />
          <p>* 프로필 이미지 : 클릭 시 수정</p>
        </div>
      </div>

      <div class="row">
        <div class="form-group form-row">
          <h1 for="name">{{ userInfo.name }}, {{ userInfo.age }}</h1>
        </div>

        <div class="col">
          <div class="card">
            <div class="card-title">
              <img src="@/assets/img/icon/유저정보아이콘.png" alt="기본정보아이콘" style="width: 50px" />
              기본 정보
            </div>
            <div class="form-group">
              <label for="id">
                <b style="color: red">*</b>
                아이디
              </label>
              <input disabled readonly type="text" id="id" class="form-input" :value="userInfo.ID" />
            </div>
            <div class="form-group">
              <label for="PASSWORD">
                <b style="color: red">*</b>
                패스워드</label>
              <input v-model="userInfo.PASSWORD" type="password" id="PASSWORD" class="form-input"
                @focus="activateLabel('PASSWORD')" @focusout="onPasswordFocusOut" />
            </div>

            <div class="form-group">
              <label for="region">
                <b style="color: red">*</b>
                지역</label>
              <input @click="search" v-model="userInfo.region" type="text" id="region" class="form-input"
                @focus="activateLabel('region')" @focusout="activateLabel('region')" />
            </div>

            <div class="form-group">
              <label for="kakaocode">카카오코드 |
                <a style="size: 10px; color: grey">
                  카카오 챗봇 QR은 아래에 있습니다.</a>
              </label>
              <input v-model="userInfo.kakaocode" type="text" id="kakaocode" class="form-input"
                @focus="activateLabel('kakaocode')" @focusout="activateLabel('kakaocode')" />
              <img v-if="userInfo.kakaocode === null" :src="kakaoQRImage" @click="showQRModal"
                style="border: 20px; margin: 5px" />
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card">
            <div class="card-title">
              <img src="@\assets\img\icon\건강정보아이콘.png" alt="건강정보아이콘" style="width: 50px" />
              건강 정보
            </div>
            <div class="form-group">
              <label for="height">
                <b style="color: red">*</b>
                신장(cm)</label>
              <input v-model="userInfo.height" type="text" id="height" class="form-input" />
            </div>
            <div class="form-group">
              <label for="weight">
                <b style="color: red">*</b>
                몸무게(kg)</label>
              <input v-model="userInfo.weight" type="text" id="weight" class="form-input" />
            </div>
            <div class="form-group">
              <label for="target_WEIGHT">
                <b style="color: red">*</b>
                목표 몸무게(kg)</label>
              <input v-model="userInfo.target_WEIGHT" type="text" id="target_WEIGHT" class="form-input" />
            </div>
            <div class="form-group">
              <label for="purpose">
                <b style="color: red">*</b>
                운동 목적</label>
              <select v-model="userInfo.purpose" id="purpose" class="form-input">
                <option value="0">다이어트 📉</option>
                <option value="1">체중유지 🛑</option>
                <option value="2">벌크업 📈</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="submit-button">회원 정보 수정</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        // ... 기존 사용자 정보 ...
        purpose: "0", // 기본값 설정
      },
      postOpen: false, // 포스트 때문에
      confirmPassword: "",
      previewImage: "",
      kakaoQRImage: this.getImageUrl("qrkakao.png"), // QR 이미지 경로
      showQR: false, // QR 이미지 모달을 표시할지 여부
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    search() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          var roadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ""; // 참고 항목 변수
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          this.userInfo.region = roadAddr;
          console.log(this.userInfo.region);
        },
      }).open();
    },
    //[ST] 유효성 검사
    validateForm() {
      if (!this.validateEmail(this.userInfo.EMAIL)) {
        alert("유효하지 않은 이메일 주소입니다.");
        return false;
      }
      if (this.userInfo.PASSWORD.length < 8) {
        alert("비밀번호는 8자 이상이어야 합니다.");
        return false;
      }
      return true;
    },
    //[ED] 유효성 검사

    // 프로필 이미지 클릭 시 바꾸기
    openImagePicker() {
      this.$refs.profileImageInput.click();
    },

    // 인풋창 효과 를 위함
    activateLabel(field) {
      this.activeLabels[field] = true;
    },
    async updateUserInfo() {
      try {
        // 비밀번호 확인
        const { value: password } = await this.$swal.fire({
          title: "비밀번호 확인",
          text: "새 비밀번호를 다시 입력해 주세요",
          input: "password",
          // ... 기존 SweetAlert 설정 ...
        });

        if (!password || password !== this.userInfo.PASSWORD) {
          this.$swal.showValidationMessage("패스워드가 일치하지 않습니다");
          return;
        }

        // 파일 업로드 및 사용자 정보 업데이트
        let formData = new FormData();
        for (let key in this.userInfo) {
          formData.append(key, this.userInfo[key]);
          console.log(this.userInfo[key], key)
        }

        if (this.userInfo.NM_PROFILEIMG && typeof this.userInfo.NM_PROFILEIMG === 'object') {
          formData.append("NM_PROFILEIMG", this.userInfo.NM_PROFILEIMG);

          const imageResponse = await this.$axiosWithoutValidation.post("/s3upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // S3 업로드 후 반환된 이미지 URL을 userInfo에 설정
          this.userInfo.NM_PROFILEIMG = imageResponse.data;
        }

        const updateResponse = await this.$axios.post("/updateuserInfo", formData);
        console.log("Axios, updateuserInfo 정보 보내기 successfully", updateResponse);
      } catch (error) {
        console.error("Axios, updateuserInfo 정보 보내기 실패", error);
      }
    },

    // qr보이기
    showQRModal() {
      this.showQR = true; // QR 이미지 모달 표시
    },

    fetchUserInfo() {
      // Axios를 사용하여 사용자 정보 가져오기
      this.$axios
        .get("/getuserInfo")
        .then((response) => {
          const userData = response.data[0]; // 데이터 배열의 첫 번째 요소를 사용
          this.userInfo = {
            ID: userData.id,
            EMAIL: userData.email,
            PASSWORD: userData.password,
            NICKNAME: userData.nickname, // 닉네임 필드가 name으로 가정
            name: userData.name,
            gender: userData.gender,
            role: userData.role,
            // birth:  userData.birth,
            target_WEIGHT: userData.target_WEIGHT,
            kakaocode: userData.kakaocode,
            height: userData.height,
            activity: userData.activity,
            weight: userData.weight,
            purpose: userData.purpose, // v-model 들어갈 데이터라 원본(purpose의 숫자형태) 보존안함
            region: userData.region,
            nm_PROFILEIMG: userData.nm_PROFILEIMG,
            // 변환해서 저장할 데이터
            age: this.calculateAge(userData.birth),
          };
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    },
    // 생일 변환
    calculateAge(birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.previewImage = URL.createObjectURL(file);
        this.userInfo.NM_PROFILEIMG = file; // 사용자 정보에 이미지 파일 추가
      }
    },
    // 패스워드 입력 필드의 focusout 이벤트 처리
    onPasswordFocusOut() {
      // SweetAlert를 사용하여 입력 팝업 표시
      this.$swal
        .fire({
          title: "비밀번호 확인",
          text: "비밀번호를 다시 입력해 주세요",
          input: "password",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
          },
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
          showLoaderOnConfirm: true,
          preConfirm: (password) => {
            // 사용자가 입력한 패스워드와 기존 패스워드 비교
            if (password !== this.userInfo.PASSWORD) {
              this.$swal.showValidationMessage("패스워드가 일치하지 않습니다");
            }
          },
          allowOutsideClick: () => !this.swal.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            // 패스워드가 일치하면 실행될 로직
            console.log("패스워드가 확인되었습니다.");
          }
        });
    },
    // 이미지 경로 잡기 위함
    getImageUrl(path) {
      return require("@/assets/img/" + path);
    },
  },
};
</script>
<style scoped>
.user-edit-form {
  display: flex;
  flex-wrap: wrap;
}

.profile-image {
  width: 250px;
  /* 원하는 크기 설정 */
  height: 250px;
  /* 너비와 높이를 같게 설정하여 원형을 만듦 */
  border-radius: 50%;
  /* 원형 모양 만들기 */
  object-fit: cover;
  /* 이미지가 태그 경계를 넘지 않도록 조정 */
}

.form-container {
  width: 100%;
}

.form-title {
  font-size: 28px;
  color: #3a6b35;
  margin-bottom: 20px;
  font-weight: bold;
}

.card {
  flex-basis: calc(50% - 20px);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 24px;
  color: #3a6b35;
  margin-bottom: 15px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #d4e6d1;
  border-radius: 4px;
  font-size: 16px;
}

.form-input:focus {
  border-color: #6dbb72;
  box-shadow: 0 0 8px rgba(109, 187, 114, 0.6);
  outline: none;
}

.submit-button {
  background-color: #6dbb72;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #579a5c;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .card {
    flex-basis: 100%;
  }
}
</style>
