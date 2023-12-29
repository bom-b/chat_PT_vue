<template>
    <main>
        <div class="progress mt-3">
            <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </main>
</template>
<script>
export default {
    computed: {
        progress() {
            if (this.height && this.weight) {
                return 75;
            } else {
                return 50;
            }
        },
    },

}
</script>
<style></style>