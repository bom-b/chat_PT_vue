<!-- Footer.vue -->
<template>
  <footer>
    <div class="footer-content">
      <div class="footer-logo">
      </div>
      <strong>Chat_PT</strong>
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
      <p>&copy; ict 01기 D조. All rights reserved.</p>
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
  background-color: #efefef;
  color: #727070;
  padding: 20px 0;
  text-align: center;
  height: 140px;
}

.footer-content {
  align-items: center;
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
  margin-top: auto;
}

template {
  min-height: 100%;
}
</style>
