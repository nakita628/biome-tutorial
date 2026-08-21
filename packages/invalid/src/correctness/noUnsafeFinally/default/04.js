(() => {
    label: try {
      return 0; // 0 is returned but suspended until finally block ends
    } finally {
      break label; // It breaks out the try-finally block, before 0 is returned.
    }
    return 1;
})();
