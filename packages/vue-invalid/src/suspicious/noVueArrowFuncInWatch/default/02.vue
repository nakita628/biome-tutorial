<script>
export default {
  watch: {
    foo: {
      handler: (val, oldVal) => {
        console.log('new: %s, old: %s', val, oldVal)
      }
    }
  }
}
</script>
