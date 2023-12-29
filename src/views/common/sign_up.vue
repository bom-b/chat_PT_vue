<template>
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

			<!-- 다음 페이지로 이동하는 버튼 -->
			<button type="button" class="btn btn-primary" :disabled="!isVerificationCodeValid"
				@click="registerUser">다음</button>

			<!-- AJAX 테스트 버튼 -->
			<button type="button" class="btn btn-secondary" @click="testAjaxRequest">Test</button>
		</div>
	</div>
</template>
  
<script>
export default {
	data() {
		return {
			name: '',
			email: '',
			verificationCode: '',
			password: '',
			isVerificationCodeValid: false,
		};
	},
	methods: {
		sendVerificationCode() {
			// 인증번호 발송 로직 구현
			// 서버에 AJAX 요청을 보내어 이메일로 인증번호를 발송하고, 발송 여부 및 유효성을 확인하여 isVerificationCodeValid 값을 업데이트합니다.
			// 인증번호를 발송한 후, 유효한 인증번호를 입력했을 때 isVerificationCodeValid 값을 true로 설정합니다.
			alert('인증번호가 발송되었습니다.')
		},
		registerUser() {
			// 회원가입을 처리하는 로직 구현
			// 서버에 AJAX 요청을 보내어 회원가입 정보를 전송합니다.
			// 회원가입이 성공적으로 처리되면 다음 페이지로 이동합니다.
		},
		testAjaxRequest() {
			// AJAX 테스트 요청
			// 서버에 AJAX 요청을 보내고 응답을 처리합니다.
			// 실제로는 서버와의 통신이 구현되어야 하며, 이 코드에서는 예시로 console.log로 응답을 출력합니다.
			console.log('AJAX 요청을 보냈습니다.');
		},
	},
};
</script>