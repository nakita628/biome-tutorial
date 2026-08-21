<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
const props = defineProps<{ name: string }>()
</script>
