import { ref } from "vue"

export default {
  setup(_props, { emit }) {
    const count = ref(0)
    emit('increment', count)
  }
}
