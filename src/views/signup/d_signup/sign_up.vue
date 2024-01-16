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
			},
			matchpwd: false,
			// 이메일 중복체크
			checkEmail: null,
			authCode: "",
			password_Check: "",
			isPasswordMismatch: false,
			inputemail: "white",
			inputid: "white",
			whyNotInsert: false,
			sendmessage: "",
			serverCode: "",
		};
	},
	computed: {
		progress() {
			return this.user.name &&
				this.user.email &&
				this.authCode &&
				this.user.password &&
				this.user.password === this.password_Check
				? 25
				: 0;
		},
		isFormValid() {
			return (
				this.user.name &&
				this.user.email &&
				this.authCode &&
				this.user.password &&
				this.user.password === this.password_Check
			);
		},
	},

	watch: {
		password(newPassword) {
			if (!newPassword && !this.password_Check) {
				this.matchpwd = false;
			} else {
				this.matchpwd = newPassword !== this.password_Check;
			}
		},
		password_Check(newPasswordCheck) {
			if (!this.user.password && !newPasswordCheck) {
				this.matchpwd = false;
			} else {
				this.matchpwd = this.user.password !== newPasswordCheck;
			}
		},
	},
	methods: {
		// 아이디 정규표현식
		checkId(id) {
			if (id !== null && id !== undefined && id.trim() !== "") {
				const reg = /^[a-zA-Z0-9]+$/;
				if (id.match(reg)) {
					return id;
				} else {
					return this.$swal("", "아이디에 특수문자를 사용할 수 없습니다.");
				}
			} else {
				return this.$swal.fire("", "아이디를 입력해주세요", "warning")
			}

		},
		idChange() {
			this.inputid = "white";
		},
		emailChange() {
			this.inputemail = "white";
		},
		// 이메일 칸에 공백 제거하기
		removeSpaces(email) {
			return email.trim();
		},
		// id 중복체크
		async IdCheck() {
			try {
				const data = {
					id: this.checkId(this.user.id),
				};

				console.log("dataId", data.id);
				const response = await this.$axiosWithoutValidation.post(
					"/signUp/id",
					data
				);
				const checkedId = parseInt(response.data);
				if (checkedId < 1) {
					const result = await Swal.fire({
						title: "",
						text: "사용 가능한 아이디입니다. 사용하시겠습니까?",
						icon: "warning",
						showCancelButton: true,
						confirmButtonColor: "#3085d6",
						cancelButtonColor: "#d33",
						confirmButtonText: "확인",
						cancelButtonText: "취소",
					});
					if (result.isConfirmed) {
						this.inputid = "gray";
					}
				} else {
					this.$swal("", "이미 있는 아이디 입니다.", "warning");
				}

			} catch (e) {
				console.log(e);
			}
		},

		confirm() {
			this.finalResults = "";
			if (!this.isSend) {
				this.finalResult = "인증번호 요청을 먼저 해주세요.";
			} else if (this.authCode === "") {
				this.finalResult = "인증번호를 입력해주세요.";
			} else if (this.authCode == this.serverCode) {
				this.isCorrect = true;
			} else {
				this.finalResult = "인증번호가 일치하지 않습니다.";
			}
		},

		// email 중복체크
		async EmailCheck() {
			try {
				const clearemail = this.removeSpaces(this.user.email);
				const response = await this.$axiosWithoutValidation.post(
					`/signUp/email/${clearemail}`
				);
				console.log("email체크", response);
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
						this.inputemail = "gray";
						this.sendMail();
					}
				} else {
					await this.$swal("이미 사용중인 이메일 입니다.");
				}
			} catch (e) {
				console.log("email 중복 체크 에러", e);
			}
		},

		sendMail() {
			const data = {
				email: this.user.email,
			};
			this.$axiosWithoutValidation
				.post("/service/authemail", data)
				.then((response) => {
					this.sendmessage =
						"인증번호가 발송 되었습니다.<br>이메일을 확인해주세요.";
					this.serverCode = response.data;
				})
				.catch(() => {
					this.goodResult = "";
					this.badResult =
						"입력하신 정보와 일치하는 회원이 없습니다.<br>해당 정보를 다시 확인하거나 회원가입을 진행해주세요.";
				});
		},
		proceedToNextPage() {
			const isValid =
				this.user.name &&
				this.user.email &&
				this.authCode &&
				this.user.password &&
				this.user.password === this.password_Check;
			if (isValid) {
				this.$emit("page1-data", this.user);
			}
		},
	},
};
</script>
<template>
	<main class="mainmargin">
		<div class="progress fixed-top" style="margin-top: 81px">
			<div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
				aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="container">
			<div class="login-container">
				<h2 class="mb-4">회원가입</h2>
				<!-- 아이디 입력 폼 -->
				<div class="row mb-3">
					<label for="id" class="col-sm-2 col-form-label">아이디:</label>
					<div class="col-sm-8">
						<div class="input-group">
							<input type="text" class="form-control" id="id" placeholder="아이디를 입력하세요" v-model="user.id"
								:style="{ 'background-color': inputid }" @input="idChange" />
							<button class="w-btn w-btn-gra-anim w-btn-gra3" type="button" @click="IdCheck">
								아이디 중복확인
							</button>
						</div>
					</div>
				</div>
				<!-- 이름 입력 폼 -->
				<div class="form-group">
					<label for="name">이름:</label>
					<input type="text" class="form-control" id="name" placeholder="이름을 입력하세요" v-model="user.name" />
				</div>
				<!-- 이메일 입력 폼 -->
				<form @submit.prevent="EmailCheck" class="mt-5">
					<div class="form-group">
						<label for="email">이메일:</label>
						<div class="input-group">
							<input type="email" class="form-control" id="email" placeholder="이메일을 입력하세요" v-model="user.email"
								:style="{ 'background-color': inputemail }" @input="emailChange" />
							<button type="submit" class="btn btn-primary">이메일 확인</button>
						</div>
					</div>
				</form>
				<!-- 인증번호 입력 폼 -->
				<div class="form-group">
					<label for="authCode">인증번호:</label>
					<div class="input-group">
						<input type="text" class="form-control" id="authCode" placeholder="인증번호를 입력하세요" v-model="authCode" />
						<button type="submit" class="btn btn-primary">인증번호 확인</button>
					</div>
				</div>
				<!-- 비밀번호 입력 폼 -->
				<div class="form-group">
					<label for="password">비밀번호:</label>
					<input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하세요" v-model="user.password" />
				</div>
				<div class="form-group">
					<label for="password_Check">비밀번호 확인:</label>
					<input type="password" class="form-control" id="password_Check" placeholder="비밀번호를 입력하세요"
						v-model="password_Check" />
					<div class="noti">
						<p v-if="matchpwd" style="color: red">
							비밀번호가 일치하지 않습니다.
						</p>
					</div>
				</div>
				<div class="button-container">
					<button type="button" class="btn btn-primary" @click="proceedToNextPage" :disabled="!user.id ||
						!user.name ||
						!user.email ||
						!authCode ||
						!user.password ||
						(!password_Check && user.password !== password_Check)
						">
						다음
					</button>
				</div>
			</div>
		</div>
	</main>
</template>
<style scoped>
.mainmargin {
	margin-top: 100px;
}
</style>
