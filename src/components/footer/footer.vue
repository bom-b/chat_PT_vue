<!-- Footer.vue -->

<template>
  <footer>
    <div class="footer-content">
      <div class="footer-logo">
        <img src="../../assets/img/춘계인%20확대.jpg" alt="Logo" />
      </div>
      <div class="footer-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div class="footer-social">
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
