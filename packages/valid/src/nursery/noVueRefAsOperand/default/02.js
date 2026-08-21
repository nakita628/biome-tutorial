import { ref } from "vue"

const ok = ref(true)
const msg = ok.value ? "yes" : "no"
if (ok.value) {
  //
}
