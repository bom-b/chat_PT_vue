<template>
  <br/>
  <br/>
  <br/>
  <analyze_header/>
  <div>
    <h4><span class="badge bg-primary">칼로리</span></h4>
    <table class="table table-borderless">
      <tbody>
      <tr>
        <td>
          300Kcal
        </td>
        <td>
          1,150 Kcal MAX
        </td>
      </tr>
      <tr>
        <td>
          ▲276 어제보다
        </td>
        <td>
          0 Kcal MIN
        </td>
      </tr>
      <tr>
        <td>
          <img src="../../assets/img/칼로리그래프.png" alt="칼로리 그래프 이미지">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div>
    <h4><span class="badge bg-primary">몸무게</span></h4>
    <img src="../../assets/img/몸무게.png" alt="몸무게 이미지">
  </div>


</template>

<style scoped>

</style>



<script>
import analyze_header from '@/components/header/d-analyze.vue';

export default {
  components: {
    analyze_header,
  },
};
</script>
