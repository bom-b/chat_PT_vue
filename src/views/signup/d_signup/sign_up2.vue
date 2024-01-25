<script>
export default {
  data() {
    return {
      agreementItems: [
        {
          detail: "이용약관 동의",
          checked: false,
        },
        {
          detail: "개인정보수집이용",
          checked: false,
        },
        {
          detail: "만 14세 이상입니다.",
          checked: false,
        },
      ],
      agreeAll: false,
      nm_profileimg: null,
      imageUrl: require("../../../assets/img/defaultImage.jpeg")
    };
  },
  watch: {
    agreeAll(newValue) {
      this.agreementItems.forEach((item) => {
        item.checked = newValue;
      });
    },
    agreementItems: {
      handler(newItems) {
        this.agreeAll = newItems.every((item) => item.checked);
      },
      deep: true,
    },
  },
  computed: {
    progress() {
      const checkedCount = this.agreementItems.filter(
        (item) => item.checked
      ).length;
      return 25 + checkedCount * 6.25;
    },
  },
  methods: {
    proceedToNextPage() {
      try {
        const isValid = 1;
        const data = {
          nm_profileimg: this.imageUrl
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
    onFileChange(e) {
      if (e.target.files.length === 0) return;
      this.nm_profileimg = e.target.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.nm_profileimg);
      console.log("이게 프로필이미지", this.nm_profileimg);
    }
  },
};
</script>

<template>
  <main class="main">
    <div class="progress fixed-top" style="margin-top: 81px">
      <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
        aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="row">
      <div class="profileIMG">
        <h3>회원 사진 등록</h3>
        <input type="file" @change="onFileChange">
        <img v-if="imageUrl" :src="this.imageUrl" alt="일반회원 이미지" />
      </div>
      <div class="container mt-5 pt-2">
        <!-- <h2 class="text-center mb-4">개인정보 동의</h2> -->
        <div class="accordion" id="agreementAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">
                꼭 읽어보세요!
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
              data-bs-parent="#agreementAccordion">
              <div class="accordion-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" v-for="(item, index) in agreementItems" :key="index">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" :id="`agree${index + 1}`" v-model="item.checked" />
                      <label class="form-check-label" :for="`agree${index + 1}`">
                        <div class="checkbox-content">
                          <h3 v-if="index === 0">{{ item.text }}</h3>
                          <h4 v-else>{{ item.text }}</h4>
                          <p>{{ item.detail }}</p>
                        </div>
                      </label>
                    </div>
                  </li>
                </ul>
                <div class="form-check mt-3">
                  <input class="form-check-input" type="checkbox" id="agreeAll" v-model="agreeAll" />
                  <label class="form-check-label" for="agreeAll">전체 동의</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2 mt-4">
        <button type="button" class="btn btn-success btn-lg" @click="proceedToNextPage"
          :disabled="!agreementItems.every((item) => item.checked)">
          다음
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
img {
  max-width: 100px;
  max-height: 100px;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55%;
  height: auto;
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
.accordion-button:not(.collapsed) {
  background-color: #67c23a;
}

@media (max-width: 768px) {
  .main {
    margin-left: 0px;
    margin-right: 0px;
    width: 100vw;
    margin-top: 80px;
    min-height: calc(100vh - 80px - 140px); /* 화면 최대길이 - 헤더높이 - 풋터높이*/
  }

  .profileIMG {
    margin-top: 50px;
    width: 100vw;
  }
}

</style>
