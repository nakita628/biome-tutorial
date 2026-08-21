<script>
export default {
    computed: {
        displayMessage() {
            return this.message.toUpperCase();
        }
    },
    methods: {
        clearMessage() {
            this.message = '';
        }
    }
};
</script>
