type Named = {
    readonly fullName: string;

    specialMethod(): void;
};

interface Named {
    readonly fullName: string;

    specialMethod(): void;
}

interface PersonConstructor {
    readonly MAX_FRIEND_COUNT: number;

    get SPECIAL_PERSON_INSTANCE(): Person;

    new(): Person;
}
