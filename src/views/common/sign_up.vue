<template>
	<main>
		<div class="progress mt-3">
			<div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
				aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="container">
			<div class="login-container">
				<h2 class="mb-4">회원가입</h2>

				<!-- 이름 입력 폼 -->
				<div class="form-group">
					<label for="name">이름:</label>
					<input type="text" class="form-control" id="name" placeholder="이름을 입력하세요" v-model="name">
				</div>

				<!-- 이메일 입력 폼 -->
				<div class="form-group">
					<label for="email">이메일:</label>
					<input type="email" class="form-control" id="email" placeholder="이메일을 입력하세요" v-model="email">
					<button type="button" class="btn btn-primary" @click="sendVerificationCode">인증번호 발송</button>
				</div>

				<!-- 인증번호 입력 폼 -->
				<div class="form-group">
					<label for="verificationCode">인증번호:</label>
					<input type="text" class="form-control" id="verificationCode" placeholder="인증번호를 입력하세요"
						v-model="verificationCode">
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
						<p v-else style="color: blue;">비밀번호가 일치합니다.</p>
					</div>
				</div>
				<div class="button-container">
					<button type="button" class="btn btn-primary" @click="proceedToNextPage"
						:disabled="!name || !email || !verificationCode || !password || !password_Check && (password !== password_Check)">다음</button>
				</div>

			</div>
		</div>
	</main>
</template>
  
<script>
export default {
	data() {
		return {
			name: '',
			email: '',
			verificationCode: '',
			password: '',
			password_Check: '',
			isPasswordMismatch: false,
		};
	},
	computed: {
		progress() {
			if (this.name && this.email && this.verificationCode && this.password && this.password === this.password_Check) {
				return 25; 
			} else {
				return 0; 
			}
		},
		isFormValid() {
			return (
				this.name &&
				this.email &&
				this.verificationCode &&
				this.password &&
				this.password === this.password_Check
			);
		},
	},
	watch: {
		password(password) {
			if (this.password && this.password_Check) {
				this.matchpwd = password !== this.password_Check;
			} else {
				this.matchpwd = false;
			}
		},
		password_Check(passwordCheck) {
			if (this.password && this.password_Check) {
				this.matchpwd = this.password !== passwordCheck;
			} else {
				this.matchpwd = true;
			}
		},
	},
	methods: {
		sendVerificationCode() {
			alert('인증번호가 발송되었습니다.')
		},
		proceedToNextPage() {
			if (this.name && this.email && this.verificationCode && this.password && this.password === this.password_Check) {
				// 필요한 모든 정보가 입력되었고, 비밀번호와 비밀번호 확인이 일치할 때 다음 페이지로 이동
				console.log("회원가입 정보:");
				console.log("이름:", this.name);
				console.log("이메일:", this.email);
				console.log("인증번호:", this.verificationCode);
				console.log("비밀번호:", this.password);
				console.log("비밀번호 확인:", this.password_Check);
				this.$router.push('/sign_up2');
			}
		},
	},
};
</script>