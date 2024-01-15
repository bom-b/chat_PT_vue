<script>
export default {
	data() {
		return {
			user: {
				name: '',
				email: '',
			},
			// 이메일 중복체크
			checkEmail: null,
			authCode: '',
			password_Check: '',
			isPasswordMismatch: false,
			inputemail: 'white',
			whyNotInsert: false,
			isSend: false,


		};
	},
	computed: {
		progress() {
			if (this.user.name && this.user.email && this.authCode && this.password && this.password === this.password_Check) {
				return 25;
			} else {
				return 0;
			}
		},
		isFormValid() {
			return (
				this.name &&
				this.email &&
				this.authCode &&
				this.password &&
				this.password === this.password_Check
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
			if (!this.password && !newPasswordCheck) {
				this.matchpwd = false;
			} else {
				this.matchpwd = this.password !== newPasswordCheck;
			}
		},
	},
	methods: {
		emailChange() {
			this.inputemail = 'white';
		},
		// 이메일 칸에 공백 제거하기
		removeSpaces(email) {
			return email.trim();
		},

		// email 중복체크
		async duplicateCheck() {
			try {
				const clearemail = this.removeSpaces(this.user.email);
				const response = await this.$axiosWithoutValidation.post(`/validCheckEmail/${clearemail}`);
				console.log('email체크', response);
				// 문자열로 오는 경우 숫자로 변환
				const emailCount = parseInt(response.data);

				if (emailCount < 1) {
					if (confirm("사용 가능한 이메일 입니다. 계속 진행하시겠습니까?")) {
						this.inputemail = 'gray';
						this.sendMail();
					}
				} else {
					alert("이미 사용중인 이메일 입니다.");
				}
			} catch (e) {
				console.log('email 중복 체크 에러', e);
			}
		},


		sendMail() {
			this.goodResult = '확인 중입니다. 잠시만 기다려주세요.'
			this.isSend = true;
			this.$axiosWithoutValidation.post(`/service/authemail/${this.user.email}`)
				.then((response) => {
					this.goodResult = '인증번호가 발송 되었습니다.<br>이메일을 확인해주세요.';
					this.serverCode = response.data;
					
				}).catch(() => {
					this.goodResult = '';
					this.badResult = '입력하신 정보와 일치하는 회원이 없습니다.<br>해당 정보를 다시 확인하거나 회원가입을 진행해주세요.'
				})
		}
	},
	proceedToNextPage() {
		if (this.user.name && this.user.email && this.authCode && this.password && this.password === this.password_Check) {
			// 필요한 모든 정보가 입력되었고, 비밀번호와 비밀번호 확인이 일치할 때 다음 페이지로 이동
			this.$router.push('/signUp/sign_up2');
		}
	},
};
</script>
<template>
	<main class="mainmargin">
		<div class="progress fixed-top" style="margin-top: 81px;">
			<div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
				aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="container">
			<div class="login-container">
				<h2 class="mb-4">회원가입</h2>

				<!-- 이름 입력 폼 -->
				<div class="form-group">
					<label for="name">이름:</label>
					<input type="text" class="form-control" id="name" placeholder="이름을 입력하세요" v-model="user.name">
				</div>
				<p v-html="whyNotInsert"></p>
				<!-- 이메일 입력 폼 -->
				<form @submit.prevent="sendMail" class="mt-5">
					<div class="form-group">
						<label for="email">이메일:</label>
						<input type="email" class="form-control" id="email" placeholder="이메일을 입력하세요" v-model="user.email"
							:style="{ 'background-color': inputemail }" @input="emailChange">
						<button type="submit" class="btn btn-primary" @click="duplicateCheck">이메일 확인</button>
					</div>
				</form>
				<!-- 인증번호 입력 폼 -->
				<div class="form-group">
					<label for="authCode">인증번호:</label>
					<input type="text" class="form-control" id="authCode" placeholder="인증번호를 입력하세요" v-model="authCode">
				</div>
				<div>

				</div>
				<!-- 비밀번호 입력 폼 -->
				<div class="form-group">
					<label for="password">비밀번호:</label>
					<input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하세요" v-model="password">
				</div>
				<div class="form-group">
					<label for="password_Check">비밀번호 확인:</label>
					<input type="password" class="form-control" id="password_Check" placeholder="비밀번호를 입력하세요"
						v-model="password_Check">
					<div class="noti">
						<p v-if="matchpwd" style="color: red;">비밀번호가 일치하지 않습니다.</p>
					</div>
				</div>
				<div class="button-container">
					<button type="button" class="btn btn-primary" @click="proceedToNextPage"
						:disabled="!name || !email || !authCode || !password || !password_Check && (password !== password_Check)">다음</button>
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
