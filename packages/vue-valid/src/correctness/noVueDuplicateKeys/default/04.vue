<script>
export default {
    props: ['foo'],
    data() {
        return {
            bar: 'baz'
        };
    },
    methods: {
        handleClick() {
            console.log('unique key');
        }
    }
};
</script>
