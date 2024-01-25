<template>
  <div class="drag-drop-container">
    <div
      class="drag-drop"
      @dragover.prevent="highlight"
      @dragenter="highlight"
      @dragleave="unhighlight"
      @drop.prevent="handleDrop"
      :class="{ 'drag-over': isDragOver }"
    >
      <div class="upload-instructions">
        <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileInput" />
        <button @click="$router.push('/default/d_upload_main')">등록하러 가기</button>
      </div>
      <div class="card-container">
      </div>
    </div>
  </div>
</template>
<style scoped>

button {
  background-color: #e5f5f2;
  color: #085c57;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #bde0dd;
}

.drag-drop-container {
  width: 600px ;
  height: 250px; /* 최소 높이를 원래 설정한 높이로 지정 */
  background-color: transparent;
  border: 2px dashed green;
  box-shadow: none;
}

.drag-drop {
  border: none;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  width: 600px; /* 전체 너비를 차지하도록 설정 */
  height: 250px; /* 최소 높이를 원래 설정한 높이로 지정 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 상단 정렬 */
  align-items: center; /* 가로 방향에서 중앙 정렬 */
  transition: transform 0.3s ease; /* 애니메이션 효과 추가 */
}

.drag-drop:hover {
  transform: translateY(-5px); /* 호버 시 약간 위로 이동 */
}

.upload-instructions {
  text-align: center;
  padding: 20px;
  color: #333; /* 텍스트 색상 조정 */
  font-weight: bold; /* 텍스트 굵게 */
}

.upload-instructions {
  text-align: center;
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap; /* 다음 줄로 넘어가도록 설정 */
  gap: 20px;
  justify-content: center;
  align-items: start; /* 위에서 아래로 정렬 */
  margin-top: 20px;
}

.drag-over {
  border-color: #2196F3;
}

.card.selected {
  border: 2px solid #085c57; /* 선택된 이미지에 대한 테두리 스타일 */
}
.delete-btn {
  border: gold;
  position: absolute; /* 삭제 버튼을 카드 상단에 위치시킴 */
  bottom: -20%; /* 상단에서 10px 떨어진 위치 */
  left: 80%; /* 오른쪽에서 10px 떨어진 위치 */
  background: white; /* 배경색 제거 */
  border: none; /* 테두리 제거 */
  padding: 0; /* 패딩 제거 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경 */
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
}

.card-img-top {
  width: 218px;
  height: 218px;
  border-radius: 8px; /* 이미지에도 둥근 모서리 적용 */
}

button {
  background-color: #4CAF50; /* 버튼 색상 변경 */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 버튼 그림자 추가 */
}

button:hover {
  background-color: #45a049; /* 버튼 호버 색상 변경 */
}

</style>

