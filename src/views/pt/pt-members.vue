<template>
  <main>
    <div class="pt-body">
      <section>
        <div class="m_title">
          <h2>PT 수강 관리 회원 페이지</h2>
        </div>
        <h4>PT 상담 예약 리스트</h4>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>이름</th>
                <th>나이</th>
                <th>성별</th>
                <th>키</th>
                <th>현재 체중</th>
                <th>목표 체중</th>
                <th>목표</th>
                <th>상담 신청 일자</th>
                <th>상담 완료!</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in wait_data" :key="index">
                <td>
                  <span
                    v-if="editingIndex !== index"
                    @click="startEdit(index, 'name')"
                    >{{ item.name }}</span
                  >
                  <input
                    v-else
                    v-model="wait_data[index].name"
                    @blur="endEdit()"
                  />
                </td>
                <!-- 다른 열에 대해서도 동일한 방식으로 처리 -->
                <td>{{ item.age }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.height }}</td>
                <td>{{ item.weight }}</td>
                <td>
                  <span
                    v-if="editingIndex !== index"
                    @click="startEdit(index, 'target_WEIGHT')"
                    >{{ item.target_WEIGHT }}</span
                  >
                  <input
                    v-else
                    v-model="wait_data[index].target_WEIGHT"
                    @blur="endEdit()"
                  />
                </td>
                <td>
                  <span
                    v-if="editingIndex !== index"
                    @click="startEdit(index, 'goal')"
                    >{{ item.goal }}</span
                  >
                  <input
                    v-else
                    v-model="wait_data[index].goal"
                    @blur="endEdit()"
                  />
                </td>
                <td>{{ item.ptstart }}</td>
                <td>
                  <button
                    class="btn-signature"
                    @click="confirmReservation(item)"
                  >
                    예약 확인
                  </button>
                </td>

                <!-- 나머지 열에 대해서도 동일한 방식으로 처리 -->
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-primary" @click="submitChanges">
          변경 사항 저장
        </button>
      </section>
      <section>
        <div class="m_title">
          <h4>PT 수강중인 회원 목록</h4>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>이름</th>
                <th>나이</th>
                <th>성별</th>
                <th>키</th>
                <th>현재 체중</th>
                <th>목표 체중</th>
                <th>목표</th>
                <th>PT 시작 일자</th>
                <th>PT 종료 일자</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in live_data" :key="index">
                <td>{{ item.name }}</td>
                <!-- 다른 열에 대해서도 동일한 방식으로 처리 -->
                <td>{{ item.age }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.height }}</td>
                <td>{{ item.weight }}</td>
                <td>
                  <span
                    v-if="editingIndex !== index"
                    @click="startEdit(index, 'target_WEIGHT')"
                    >{{ item.target_WEIGHT }}</span
                  >
                  <input
                    v-else
                    v-model="live_data[index].target_WEIGHT"
                    @blur="endEdit()"
                  />
                </td>
                <td>
                  <span
                    v-if="editingIndex !== index"
                    @click="startEdit(index, 'goal')"
                    >{{ item.goal }}</span
                  >
                  <input
                    v-else
                    v-model="live_data[index].goal"
                    @blur="endEdit()"
                  />
                </td>
                <td>
                  {{ item.ptstart }}
                </td>
                <td>
                  <span
                    v-if="editingIndex !== index"
                    @click="startEdit(index, 'ptend')"
                    >{{ item.ptend }}</span
                  >
                  <input
                    v-else
                    v-model="live_data[index].ptend"
                    @blur="endEdit()"
                  />
                </td>
                <!-- 나머지 열에 대해서도 동일한 방식으로 처리 -->
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-success" @click="submitChanges">
          변경 사항 저장
        </button>
      </section>
    </div>
  </main>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      editingIndex: -1, // 현재 편집 중인 행의 인덱스를 추적합니다.
      wait_data: [], // PT 상담 예약 리스트 데이터
      live_data: [], // PT 수강중인 회원 목록 데이터
      // 나머지 데이터와 메서드는 여기에 추가하세요.
    };
  },
  methods: {
    // 클릭 이벤트를 처리하여 해당 행을 편집 모드로 변경합니다.
    startEdit(index, field) {
      this.editingIndex = index;
      this.editingField = field;
    },
    // 편집 모드를 종료합니다.
    endEdit() {
      this.editingIndex = -1;
      this.editingField = null;
    },
    // 변경 사항을 저장하는 메서드
    submitChanges() {
      // 변경된 데이터를 서버에 전송하거나 로컬 스토리지에 저장하는 등의 로직을 추가합니다.
      // 변경된 데이터는 this.wait_data와 this.live_data에서 가져올 수 있습니다.
      this.editingIndex = -1; // 편집 모드를 종료합니다.
      this.editingField = null;
    },
    selectCheck({ records }) {
      this.select_data = records.filter((record) => record._XSelection);
    },
    agree() {
      this.select_data.forEach((record) => {
        const index = this.new_data.indexOf(record);
        if (index !== -1) {
          this.new_data.splice(index, 1);
          this.select_mem_table.push(record);
        }
      });
      this.select_data = []; // 선택한 회원 데이터 초기화
    },
    onScrollAnimation() {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        if (elementPosition < viewportHeight) {
          element.classList.add("active");
        }
      });
    },
    fetchData() {
      this.$axios
        .get("/pthandleAll") // API의 URL을 여기에 입력합니다.
        .then((response) => {
          this.live_data = response.data
            .filter((item) => item.status === "live")
            .map(this.transformData);
          this.wait_data = response.data
            .filter((item) => item.status === "wait")
            .map(this.transformData);
        })
        .catch((error) => {
          console.error("There was an error fetching the data:", error);
        });
    },
    transformData(item) {
      return {
        name: item.name,
        gender: item.gender,
        age: this.calculateAge(item.birth),
        ptstart: this.formatDate(item.ptstart),
        ptend: this.formatDate(item.ptend),
        height: item.height + " cm",
        target_WEIGHT: item.target_WEIGHT + " kg",
        weight:
          this.compareWeight(item.weight, item.target_WEIGHT, item.purpose) +
          item.weight +
          " kg",
        goal: this.purposeToText(item.purpose), // 목표를 텍스트로 변환
        userid: item.userid,
        // 필요한 추가적인 필드 변환
      };
    },
    purposeToText(purpose) {
      switch (purpose) {
        case 0:
          return "다이어트";
        case 1:
          return "체중유지";
        case 2:
          return "벌크업";
        default:
          return "알 수 없음"; // 기본값 처리
      }
    },
    calculateAge(birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    },
    compareWeight(currentWeight, targetWeight, purpose) {
      if ((targetWeight > currentWeight) & (purpose == 2)) {
        return " ⬆️ ";
      } else if ((targetWeight < currentWeight) & (purpose == 0)) {
        return " ⬇️ ";
      } else {
        return " 🫡 유지 요망! "; // 목표 체중과 현재 체중이 같은 경우
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return ""; // 날짜가 없는경우 빈 문자열을 반환
      const date = new Date(dateStr);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
    // 예약 완료 메소드
    async confirmReservation(item) {
      // item.status를 "live"로 변경
      try {
        const requestData = {
          userid: item.userid,
          status: "live",
        };
        console.log(requestData);

        // PT 신청 API 요청
        this.$swal
          .fire({
            icon: "question",
            title: "PT상담을 완료 하시겠습니까?",
            text: "기존 PT상담을 취소 하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "PT예약 완료",
            cancelButtonText: "아니요, 유지하겠습니다.",
          })
          .then(async (result) => {
            if (result.value) {
              await this.$axios.post("/pthandleToLive", requestData);

              const Toast = this.$swal.mixin({
                toast: true,
                position: "center-center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: item.name + " 님의 PT수업이 시작 되었습니다.",
              }).then(() => {
                window.location.reload();
              });
            }
          });
      } catch (e) {
        this.$swal.fire({
          icon: "failed",
        });
      }
    },
  },
  mounted() {
    this.fetchData();
    window.addEventListener("scroll", this.onScrollAnimation);
  },
};
</script>

<style scoped>
.m_title {
  margin-top: 20px;
}

.vxe-table--empty-content {
  display: none !important;
}
.text-wrap {
  white-space: normal; /* 줄바꿈 허용 */
  word-break: break-word; /* 단어 내에서도 줄바꿈 허용 */
}

.button-animation {
  transition: background-color 0.3s, transform 0.3s;
}

.button-animation:hover {
  background-color: #3f232d; /* 네온 색상으로 변경 */
  transform: translateY(-5px); /* 버튼이 살짝 위로 올라감 */
}

.fade-in {
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.btn {
  padding: 10px 20px;
  margin: 16px;
  border: none;
  background-image: linear-gradient(45deg, hsl(120, 69%, 11%), #525f5e);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.btn:active,
.btn:focus {
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.side-icon {
  position: relative;
  /* right: -75px; */
  transition: transform 300ms;
}

.side .side-icon:hover {
  transform: rotateY(360deg);
  pointer-events: all;
}

.naver {
  position: relative;
  width: 50px;
  height: 50px;
}
</style>