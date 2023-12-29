<style>
.router-link {
    text-decoration: none;
    /* 밑줄 제거 */
    color: inherit;
    /* 기본 링크 색상 유지 */

}
</style>


<template>
    <div class="login">
        <nav class="navbar navbar-expand-sm navbar-light bg-light" style="min-height: 80px;">
            <div class="container-fluid">
                <router-link to="/d_home" class="router-link">
                    <img src="../../assets/img/배경지운 로고.png" alt="" style="width: 50px;">
                    <a class="navbar-brand">Chat PT</a>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span class="navbar-toggler-icon">로그인</span>
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {

};
</script>
<style>
.login {
    color: red;
}
</style>