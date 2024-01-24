<template>
    <div class="user-edit-form">
      <form
        @submit.prevent="updateUserInfo"
        class="form-container"      >
        <h2 class="form-title">회원 정보 수정</h2>
        <div class="form-row">
          <!-- :src="getImageUrl(user.nm_PROFILEIMG)" -->

          <div class="form-group form-row">
            <h1 for="name">이성한, 29</h1>
          </div>
          <div>
            <img
              :src="previewImage"
              alt="Profile Preview"
              class="profile-image"
              @click="openImagePicker"
            />
            <input
              ref="profileImageInput"
              @change="handleImageChange"
              type="file"
              id="profileImage"
              class="form-input"
              style="display: none"
            />
            <p>* 프로필 이미지 : 클릭 시 수정</p>
          </div>

          <div class="form-group">
            <div class="input-container">
              <div>
                <h4 style="margin-right: 5px; padding: 6px">아이디</h4>
              </div>
              <div class="input-field">
                <input
                  disable
                  readonly
                  v-model="userInfo.ID"
                  type="id"
                  id="id"
                  class="form-input"
                />
                <label for="id" :class="{ 'label-active': activeLabels.ID }"
                  >더미 아이디지롱</label
                >
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="input-container">
              <div>
                <h4 style="margin-right: 5px; padding: 6px">패스워드</h4>
              </div>
              <div class="input-field">
                <input
                  v-model="userInfo.PASSWORD"
                  type="PASSWORD"
                  id="PASSWORD"
                  class="form-input"
                  @focus="activateLabel('PASSWORD')"
                  @focusout="activateLabel('PASSWORD')"
                />
                <label
                  for="PASSWORD"
                  :class="{ 'label-active': activeLabels.PASSWORD }"
                  >*********</label
                >
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="input-container">
              <div>
                <h4 style="margin-right: 5px; padding: 6px">닉네임</h4>
              </div>
              <div class="input-field">
                <input
                  v-model="userInfo.NICKNAME"
                  type="NICKNAME"
                  id="NICKNAME"
                  class="form-input"
                  @focus="activateLabel('NICKNAME')"
                  @focusout="activateLabel('NICKNAME')"
                />
                <label
                  for="NICKNAME"
                  :class="{ 'label-active': activeLabels.NICKNAME }"
                  >김아무개씨</label
                >
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="input-container">
              <div>
                <h4 style="margin-right: 5px; padding: 6px">이메일</h4>
              </div>
              <div class="input-field">
                <input
                  v-model="userInfo.EMAIL"
                  type="email"
                  id="EMAIL"
                  class="form-input"
                  @focus="activateLabel('EMAIL')"
                  @focusout="activateLabel('EMAIL')"
                />
                <label
                  for="EMAIL"
                  :class="{ 'label-active': activeLabels.EMAIL }"
                  >nias2734@naver.com</label
                >
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="submit-button">Update Profile</button>
      </form>
    </div>

</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        EMAIL: "",
        PASSWORD: "",
        // ... 다른 필드들
      },
      activeLabels: {
        ID: false,
        EMAIL: false,
        NICKNAME: false,
      },

      confirmPassword: "",
      previewImage: "",
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
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

    fetchUserInfo() {
      // Axios를 사용하여 사용자 정보 가져오기
      this.$axios
        .get("/getuserInfo")
        .then((response) => {
          this.userInfo = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    },
    updateUserInfo() {
      if (this.userInfo.PASSWORD !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // 이미지가 있다면 FormData를 사용
      let formData = new FormData();
      for (let key in this.userInfo) {
        formData.append(key, this.userInfo[key]);
      }

      // Axios를 사용하여 사용자 정보 업데이트
      this.$axios
        .post("/api/user/update", formData)
        .then((response) => {
          console.log(response);
          alert("User info updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating user info:", error);
        });
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      this.userInfo.NM_PROFILEIMG = file;
      this.previewImage = URL.createObjectURL(file);
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
  background-color: #f0f4f1;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.form-title {
  font-size: 28px;
  margin-bottom: 25px;
  color: #3a6b35;
  font-weight: bold;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.form-group {
  flex-basis: calc(50% - 15px);
  margin-bottom: 25px;
}

.label {
  font-size: 18px;
  margin-bottom: 10px;
  color: #3a6b35;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #d4e6d1;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  align-content: center;
  vertical-align: -webkit-baseline-middle;
}

.form-input:focus {
  border-color: #6dbb72;
  box-shadow: 0 0 8px rgba(109, 187, 114, 0.6);
  outline: none;
}

.profile-image {
  max-width: 120px;
  margin-top: 15px;
  border-radius: 8px;
}

.submit-button {
  background-color: #6dbb72;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #579a5c;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .form-group {
    flex-basis: 100%;
  }
}

/* 원형 자기 프로필 사진 */
.card-profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* 원형으로 만들기 */

  top: 180px; /* 조정하여 적절한 위치에 배치 */
  transform: translateX(-50%);
  margin-bottom: 60px;
}

/* [st] 인풋창 애니메이션 효과 */
.form-group {
  position: relative;
  margin-bottom: 15px;
}

.input-container {
  position: relative;
  display: flex;
  align-content: center;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-field {
  position: relative;
  flex-grow: 1; /* 남은 공간을 채우도록 설정 */
  font-weight: bold;
  color: #3f3f3f;
}

label {
  position: absolute;
  font-weight: bold;
  left: 10px;
  top: 10px;
  font-size: 15px;
  color: #3838389c;
  transition: all 0.3s ease;
  pointer-events: none;
}

.label-active {
  top: -16px;
  left: 10px;
  font-size: 20px;
  color: rgb(10, 10, 10) d3d;
}
/* [ed] 인풋창 애니메이션 효과 */
</style>