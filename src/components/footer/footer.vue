<!-- Footer.vue -->

<template>
  <footer>
    <div class="footer-content">
      <div class="footer-logo">
        <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif" alt="Logo" />
        <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif" alt="Logo" />
      </div>
      <div class="footer-links">
        <router-link to="/contact">ict 01기 D조</router-link>
      </div>
      <div class="footer-social">
        <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif" alt="Logo" />
        <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif" alt="Logo" />
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
};
</script>

<style scoped>
/* Add your styling for the footer here */
footer {
  background-color: #f8f9f8;
  color: #727070;
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo img {
  max-width: 100px;
}

.footer-links a {
  margin: 0 15px;
  text-decoration: none;
  color: #727070;
  font-weight: bold;
}

.footer-social a {
  margin: 0 10px;
  text-decoration: none;
  color: #00997b;
  font-size: 1.5em;
}

.footer-bottom {
  margin-top: 20px;
}
</style>
