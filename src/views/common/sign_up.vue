<template>
	<main>
		<div>
			<h2>회원가입</h2>

			<div class="btn-group">
				<button v-for="categoryOption in categoryOptions" :key="categoryOption.value"
					:class="['btn', 'btn-secondary', { 'active': category === categoryOption.value }]"
					@click="selectCategory(categoryOption.value)">
					{{ categoryOption.label }}
				</button>
			</div>

			<div>
				<label>이메일:</label>
				<input type="email" v-model="email" class="form-control">
			</div>

			<div>
				<label>이름:</label>
				<input type="text" v-model="name" class="form-control">
			</div>

			<div>
				<label>나이:</label>
				<input type="number" v-model="age" class="form-control">
			</div>

			<div>
				<label>키:</label>
				<input type="number" v-model="height" class="form-control">
			</div>

			<div>
				<label>체중:</label>
				<input type="number" v-model="weight" class="form-control">
			</div>

			<div>
				<label>성별:</label>
				<div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" id="male" value="남성" v-model="gender">
						<label class="form-check-label" for="male">남성</label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" id="female" value="여성" v-model="gender">
						<label class="form-check-label" for="female">여성</label>
					</div>
				</div>
			</div>

			<button @click="submitForm" class="btn btn-primary">가입하기</button>
		</div>
	</main>
</template>
  
<script>
export default {
	data() {
		return {
			category: '일반회원',
			categoryOptions: [
				{ label: '일반회원', value: '일반회원' },
				{ label: 'PT회원', value: 'PT회원' }
			],
			email: '',
			name: '',
			age: null,
			height: null,
			weight: null,
			gender: ''
		};
	},
	methods: {
		selectCategory(category) {
			this.category = category;
		},
		submitForm() {
			// 회원가입 폼 제출 로직 구현
			console.log('회원가입 폼 제출:', this.category, this.email, this.name, this.age, this.height, this.weight, this.gender);
		}
	}
};
</script>
  
<style scoped>
.btn-group {
	display: flex;
	margin-bottom: 1rem;
}

.btn {
	flex: 1;
}

.form-control {
	width: 100%;
	margin-bottom: 1rem;
}

.form-check-inline {
	margin-right: 1rem;
}
</style>