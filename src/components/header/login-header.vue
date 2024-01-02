<style>
.router-link {
    text-decoration: none;
    /* 밑줄 제거 */
    color: inherit;
    /* 기본 링크 색상 유지 */

}
</style>


<template>
    <nav class="navbar navbar-expand-sm fixed-top navbar-light bg-light " style="min-height: 80px;">
        <div class="container-fluid">
            <router-link to="/d_home" class="router-link">
                <img src="../../assets/img/배경지운 로고.png" alt="" style="width: 50px;">
                <a class="navbar-brand TheJamsil400" style="font-weight: bold;">Chat <span class="TheJamsil400 pine_Green_text" style="font-weight: bold;">PT</span></a>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>
</template>

<script>
export default {

};
</script>
