class Container {
    private readonly neverModifiedMember = true;
    private readonly onlyModifiedInConstructor: number;
    readonly #neverModifiedPrivateField = 3;

    public constructor(
        onlyModifiedInConstructor: number,
        private readonly neverModifiedParameter: string,
    ) {
        this.onlyModifiedInConstructor = onlyModifiedInConstructor;
    }
}
