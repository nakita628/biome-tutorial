<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  value: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
</script>
