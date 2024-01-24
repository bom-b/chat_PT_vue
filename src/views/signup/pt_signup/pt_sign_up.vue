<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
	data() {
		return {
			user: {
				id: "",
				name: "",
				email: "",
				password: "",
				role: "TRAINER",
				password_Check: "",
				isverified: 0,
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
				resultmessage: "",
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

		regId(id) {
			if (id !== null && id !== undefined && id.trim() !== "") {
				const reg = /^[a-zA-Z0-9]+$/;
				if (id.match(reg)) {
					return id;
				} else {
					return this.$swal("", "영문 숫자로 입력해주세요...");
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
				}
				else {
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
					id: this.user.id,
					name: this.user.name,
					email: this.user.email,
					password: this.user.password,
					role: this.user.role,
					isverified: this.user.isverified
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
				<h2 class="mb-4">PT 회원가입</h2>
				<!-- 아이디 입력 폼 -->
				<form @submit.prevent="idcheck">
					<div class="row mb-3">
						<label for="id" class="col-sm-3 col-form-label">아이디:</label>
						<div class="col-sm-7">
							<div class="input-group">
								<input type="text" class="form-control" id="id" placeholder="아이디를 입력하세요" v-model="user.id"
									:disabled="inputDisplay.id == 1" />
								<button class="btn btn-success" type="submit">
									아이디 중복확인
								</button>
							</div>
						</div>
					</div>
				</form>

				<!-- 이름 입력 폼 -->
				<div class="row mb-3">
					<label for="name" class="col-sm-3 col-form-label">이름:</label>
					<div class="col-sm-7">
						<div class="input-group">
							<input type="text" class="form-control" id="name" placeholder="이름을 입력하세요" v-model="user.name" />
						</div>
					</div>
				</div>
				<!-- 이메일 입력 폼 -->
				<form @submit.prevent="emailCheck" class="mt-5">
					<div class="row mb-3">
						<label for="email" class="col-sm-3 col-form-label">이메일:</label>
						<div class="col-sm-7">
							<div class="input-group">
								<input type="email" class="form-control" id="email" placeholder="이메일을 입력하세요"
									v-model="user.email" :disabled="inputDisplay.email == 1" />
								<button type="submit" class="btn btn-success">
									이메일 확인
								</button>
							</div>
						</div>
						<div class="loading">
							<p>
								<span>
									<img v-if="showMessage.emailStatus === '메일을 발송 중입니다...'"
										src="../../../assets/img/gif/loading.gif" style="width: 15px; height: 15px;">
									<img v-else-if="showMessage.emailStatus === '메일이 발송되었습니다.'"
										src="../../../assets/img/gif/mail2.gif" style="width: 15px; height: 15px;">
									{{ showMessage.emailStatus }}
								</span>
							</p>
						</div>
					</div>
				</form>
				<!-- 인증번호 입력 폼 -->
				<div v-if="inputDisplay.email == 1">
					<form @submit.prevent="confirm">
						<div class="mt-5 form-group">
							<label for="code">인증번호</label>
							<input v-model="auth.clientCode" :disabled="auth.passAuth === 1" type="text"
								class="form-control" id="code" />
						</div>
						<div class="noti">
							<p v-if="auth.passAuth === 1" style="color: rgb(57, 221, 16)">
								인증되었습니다.
							</p>
							<p v-else-if="auth.passAuth === 0" style="color: rgb(231, 14, 14)">
								인증 번호가 다릅니다.
							</p>
						</div>
						<div class="mt-5" style="text-align: right">
							<button type="submit" class="mb-2 btn-signature login-btn">
								인증하기
							</button>
						</div>
					</form>
				</div>
				<!-- 비밀번호 입력 폼 -->
				<div>
					<div class="row mb-3">
						<label for="password" class="col-sm-3 col-form-label">비밀번호:</label>
						<div class="col-sm-7">
							<div class="input-group">
								<input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하세요"
									v-model="user.password" />
							</div>
						</div>
					</div>
					<div class="row mb-3">
						<label for="password_Check" class="col-sm-3 col-form-label">비밀번호 확인:</label>
						<div class="col-sm-7">
							<div class="input-group">
								<input type="password" class="form-control" id="password_Check" placeholder="비밀번호를 입력하세요"
									v-model="user.password_Check" />
							</div>
						</div>
					</div>
					<div class="noti">
						<p v-if="matchpwd" style="color: red">
							비밀번호가 일치하지 않습니다.
						</p>
					</div>
				</div>
			</div>

			<div class="button-container">
				<button type="button" class="btn btn-success" @click="proceedToNextPage" :disabled="!user.id ||
					!user.name ||
					!user.email ||
					!user.password ||
					!user.password_Check ||
					!auth.clientCode ||
					auth.clientCode != auth.serverCode ||
					inputDisplay.id != 1 ||
					inputDisplay.email != 1 ||
					auth.passAuth != 1 ||
					user.password != user.password_Check
					">
					다음
				</button>
			</div>
		</div>
	</main>
</template>
<style scoped>
.main {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60%;
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

/* p {
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  background-image: url("../../../assets/img/gif/loading.gif");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
} */
</style>
