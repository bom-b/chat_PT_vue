<template>
  <div class="user-edit-form" :class="{ 'dark-theme': isDarkTheme }">
    <form @submit.prevent="updateUserInfo" class="form-container">
      <h2 class="form-title">회원 정보 수정</h2>
      <div class="form-row">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="userInfo.EMAIL" type="email" id="email" class="form-input" />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="userInfo.PASSWORD" type="password" id="password" class="form-input" />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" class="form-input" />
        </div>

        <div class="form-group">
          <label for="weight">Weight:</label>
          <input v-model.number="userInfo.WEIGHT" type="number" id="weight" class="form-input" />
        </div>

        <div class="form-group">
          <label for="height">Height:</label>
          <input v-model.number="userInfo.HEIGHT" type="number" id="height" class="form-input" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="purpose">Purpose:</label>
          <input v-model="userInfo.PURPOSE" type="text" id="purpose" class="form-input" />
        </div>

        <div class="form-group">
          <label for="activity">Activity:</label>
          <input v-model="userInfo.ACTIVITY" type="text" id="activity" class="form-input" />
        </div>

        <div class="form-group">
          <label for="targetWeight">Target Weight:</label>
          <input v-model.number="userInfo.TARGET_WEIGHT" type="number" id="targetWeight" class="form-input" />
        </div>

        <div class="form-group">
          <label for="profileImage">Profile Image:</label>
          <input @change="handleImageChange" type="file" id="profileImage" class="form-input" />
          <img :src="previewImage" alt="Profile Preview" class="profile-image" />
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
      confirmPassword: "",
      previewImage: "",
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      // Axios를 사용하여 사용자 정보 가져오기
      this.$axios
        .get("/api/user/info")
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
  },
};
</script>


<style scoped>
.user-edit-form {
  background-color: #f0f4f1;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Arial, sans-serif;
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
</style>