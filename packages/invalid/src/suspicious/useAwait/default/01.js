async function fetchData() {
// Missing `await` for the promise returned by `fetch`
  return fetch('/data');
}
