<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2025 Crystal UI. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CrystalFooter'
}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px var(--padding);
  background-color: var(--surface-color);
  border-top: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.footer-content {
  text-align: center;
  color: var(--text-secondary);
}
</style>