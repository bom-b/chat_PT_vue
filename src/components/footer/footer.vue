<!-- Footer.vue -->
<template>
  <footer>
    <div class="footer-content">
      <div class="footer-logo">
      </div>
      <strong>Chat_PT</strong>
    </div>
    <div class="footer-bottom">
      <p>&copy; CHOONSIX. All rights reserved.</p>
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
  padding: 30px 0;
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
  margin-top: 30px;
}

template {
  min-height: 100%;
}
</style>
