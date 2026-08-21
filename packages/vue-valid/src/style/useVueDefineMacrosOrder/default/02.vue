<script lang="ts" setup>
import { ref } from 'vue'

const model = defineModel()
const props = defineProps<{ name: string }>()
const emit = defineEmits(['update'])

const count = ref(0)
</script>
