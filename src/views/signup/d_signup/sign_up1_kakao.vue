<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  data() {
    return {
      user: {
        nickname: JSON.parse(window.localStorage.getItem('newKakaoUserData')).nickname,
        id: JSON.parse(window.localStorage.getItem('newKakaoUserData')).id,
        name: "",
        email: JSON.parse(window.localStorage.getItem('newKakaoUserData')).email,
        password: "",
        role: "NORMAL",
        password_Check: "",
        region: "",
        kakaocode: "",
      },
      inputDisplay: {
        id: 0,
        email: 0,
      },
      auth: {
        passAuth: null,
        clientCode: null,
        serverCode: null,
      },
      showMessage: {
        checkmessage: "",
        emailStatus: "",
      },
      matchpwd: false,
      gogonext: false,
    };
  },
  computed: {
    progress() {
      return this.user.id &&
      this.user.name &&
      this.user.email &&
      this.auth.clientCode &&
      this.user.password &&
      this.user.password === this.user.password_Check
          ? 25
          : 0;
    },
  },
  watch: {
    "user.password": function (newPassword) {
      this.checkPasswordMatch(newPassword);
    },
    "user.password_Check": function (newPasswordCheck) {
      this.checkPasswordMatch(newPasswordCheck);
    },
  },
  methods: {
    regPassword(password) {
      if (
          password !== null &&
          password !== undefined &&
          password.trim() !== ""
      ) {
        const reg =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if (password.match(reg)) {
          return password;
        } else {
          return this.$swal(
              "형식오류",
              "비밀번호는 영문, 숫자, 특수문자를 섞어서 만들어주세요."
          );
        }
      } else {
        return this.$swal.fire("형식오류", "아이디를 입력해주세요", "warning");
      }
    },
    checkPasswordMatch() {
      const newPassword = this.user.password || "";
      const newPasswordCheck = this.user.password_Check || "";

      if (!newPassword && !newPasswordCheck) {
        this.matchpwd = false;
      } else {
        this.matchpwd = newPassword !== newPasswordCheck;
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
          this.user.region = roadAddr;
          console.log(this.user.region);
        }
      }).open();
    },
    regId(id) {
      if (id !== null && id !== undefined && id.trim() !== "") {
        const reg = /^[a-zA-Z0-9]{6,15}$/;
        if (id.match(reg)) {
          return id;
        } else {
          return this.$swal("", "영문 숫자로 6자리 이상, 15자리 미만으로 입력해주세요.");
        }
      } else {
        return this.$swal.fire("", "아이디를 입력해주세요", "warning");
      }
    },
    removeSpaces(data) {
      return data.trim();
    },
    // id 중복체크
    async idcheck() {
      try {
        const clearid = this.removeSpaces(this.user.id);
        if (clearid !== null && clearid !== undefined && clearid !== "") {
          const data = {
            id: this.regId(this.user.id),
          };
          const response = await this.$axiosWithoutValidation.post(
              "/signUp/id",
              data
          );
          const checkedId = parseInt(response.data);
          if (checkedId < 1) {
            const result = await Swal.fire({
              title: "",
              text: "사용 가능한 아이디입니다. 사용하시겠습니까?",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "확인",
              cancelButtonText: "취소",
            });
            if (result.isConfirmed) {
              this.inputDisplay.id = 1;
            }
          } else {
            this.$swal("", "이미 있는 아이디 입니다.", "warning");
          }
        } else {
          this.$swal("", "아이디를 입력하세요.", "warning")
        }
      } catch (e) {
        console.log(e);
      }
    },
    passwordCheck() {
      try {
        const password = this.regPassword(this.user.password);
        password;
      } catch (e) {
        console.log(e);
      }
    },
    confirm() {
      if (
          this.auth.serverCode != "" && this.auth.serverCode != null && this.auth.serverCode != undefined &&
          this.auth.clientCode != "" && this.auth.clientCode != null && this.auth.clientCode != undefined &&
          this.auth.serverCode == this.auth.clientCode
      ) {
        return (this.auth.passAuth = 1);
      } else {
        return (this.auth.passAuth = 0);
      }
    },
    goback() {
      this.$router.go(-1);
    },
    // email 중복체크
    async emailCheck() {
      try {
        const clearemail = this.removeSpaces(this.user.email);
        if (clearemail !== null && clearemail !== undefined && clearemail !== "") {
          const data = {
            email: clearemail,
          };
          const response = await this.$axiosWithoutValidation.post(
              "/signUp/email",
              data
          );
          // 문자열로 오는 경우 숫자로 변환
          const emailCount = parseInt(response.data);
          if (emailCount < 1) {
            const result = await Swal.fire({
              title: "사용 가능한 이메일 입니다.",
              text: "계속 진행하시겠습니까?",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "확인",
              cancelButtonText: "취소",
            });
            if (result.isConfirmed) {
              this.showMessage.emailStatus = "메일을 발송 중입니다...";
              this.sendMail(data);
            }
          } else {
            await this.$swal("이미 사용중인 이메일 입니다.");
          }
        } else {
          this.$swal("", "이메일을 입력하세요.", "warning")
        }
      } catch (e) {
        console.log("email 중복 체크 에러", e);
      }
    },
    async sendMail(data) {
      try {
        const response = await this.$axiosWithoutValidation.post(
            "/service/authemail",
            data
        );
        this.auth.serverCode = response.data;
        this.showMessage.emailStatus = "메일이 발송되었습니다.";
        this.inputDisplay.email = 1;
      } catch (e) {
        console.log(e);
        this.showMessage.emailStatus = "메일 발송에 실패 했습니다.";
      }
    },
    proceedToNextPage() {
      try {
        const isValid = 1;
        const data = {
          nickname: this.user.nickname,
          id: this.user.id,
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          role: this.user.role,
          region: this.user.region,
          kakaocode: this.user.kakaocode,
        };
        if (isValid) {
          this.$emit("nextPage", data);
        } else {
          this.$swal("유효하지 않은 경로입니다.");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<template>
  <main class="main">
    <div class="progress fixed-top" style="margin-top: 81px">
      <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
           aria-valuemin="0" aria-valuemax="100"></div>
    </div>

    <div class="container">
      <div class="login-container">
        <div class="back_button">
          <button class="btn" @click="goback">
            <i class="bi bi-arrow-left"></i>
          </button>
        </div>
        <div class="title-box">
          <h2 class="">일반 회원가입</h2>
          <h5 class="mb-5">with <span style="color: #f8b202;">kakao</span></h5>
        </div>
          <!-- 이름 입력 폼 -->
          <div class="row mb-3">
            <label for="name" class="col-sm-3 col-form-label">
              <span style="color:red;">
                *
              </span>이름:</label>
            <div class="col-sm-7">
              <div class="input-group">
                <input type="text" class="form-control" id="name" placeholder="이름을 입력하세요" v-model="user.name"/>
              </div>
            </div>
          </div>
          <!-- 닉네임 -->
          <div class="row mb-3">
            <label for="nickname" class="col-sm-3 col-form-label">
              <span style="color:red;">
                *
              </span>닉네임:</label>
            <div class="col-sm-7">
              <div class="input-group">
                <input type="text" class="form-control" id="nickname" placeholder="닉네임을 입력하세요" v-model="user.nickname"/>
              </div>
            </div>
          </div>
        <!-- 지역 -->
        <div class="row mb-3">
          <label for="region" class="col-sm-3 col-form-label">
              <span style="color:red;">
                *
              </span>주소:</label>
          <div class="col-sm-7">
            <div class="input-group">
              <input type="text" class="form-control" id="region" placeholder="도로명주소" readonly @click="search"
                     v-model="user.region">
            </div>
          </div>
        </div>
        <div class="row mt-5 mb-3">
          <label for="name" class="col-sm-4 col-form-label">카카오채널 연동코드:</label>
          <div class="col-sm-6">
            <div class="input-group">
              <input type="text" class="form-control" id="kakaocode" placeholder="(선택)카카오채널에서 발급받아주세요."
                     v-model="user.kakaocode"/>
            </div>
          </div>
        </div>
      </div>

      <div class="button-container float-end">
        <button type="button" class="btn btn-success next_button" @click="proceedToNextPage" :disabled="!user.id ||
          !user.name ||
          !user.region ||
          !user.nickname
          ">

          다음
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped>
.back_button {
  margin-left: -40px;
  margin-top: -190px;
  padding-bottom: 200px;
}

.btn i {
  font-size: 1.5rem;
  transition: font-size 0.3s ease;
}

.btn:hover i {
  font-size: 1.8rem;
}

.main {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  text-align: left;
  margin: auto;
  border: 1px solid #f0f2f1;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* 그림자 추가 */
  transition: background-color 0.2s ease;
}

.loading span {
  display: flex;
  align-items: center;
  /* 자식 요소들을 세로 방향으로 가운데 정렬 */
}

@media (max-width: 768px) {
  .main {
    margin-left: 0px;
    margin-right: 0px;
    width: 100vw;
  }
}
</style>
