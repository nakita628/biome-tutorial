<script>
import { SvelteMap } from "svelte/reactivity";
let map = $state(new SvelteMap());
map = new SvelteMap();
</script>
