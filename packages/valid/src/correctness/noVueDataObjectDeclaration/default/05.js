// global registration with function syntax
Vue.component('my-comp', {
  /* ✓ GOOD */
  data: function () {
    return { count: 0 };
  }
});
