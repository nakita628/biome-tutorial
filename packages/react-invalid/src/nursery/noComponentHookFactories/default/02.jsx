function makeHook(key) {
  function useMyHook() {
    return useState(key);
  }
  return useMyHook;
}
