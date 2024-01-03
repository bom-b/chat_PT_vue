<template>
    <main>
        <div>
            <ul>
                <li v-for="item in list" :key="item.userid">
                    {{ item.userid }}
                </li>
            </ul>
        </div>
    </main>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            list: [],
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios
                .get('http://192.168.0.30/springpt/trainerList')
                .then((resp) => {
                    this.list = resp.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
  
<style></style>