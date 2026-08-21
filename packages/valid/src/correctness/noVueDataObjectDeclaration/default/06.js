// Composition API and createApp entrypoints
defineComponent({
  /* ✓ GOOD */
  data() {
    return { message: 'hi' };
  }
});

createApp({
  /* ✓ GOOD */
  data: function() {
    return { active: true };
  }
}).mount('#app');
