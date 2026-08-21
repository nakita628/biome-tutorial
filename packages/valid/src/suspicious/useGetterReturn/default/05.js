const obj = {
    get firstName() {
        return this.fullname.split(" ")[0];
    }
}
