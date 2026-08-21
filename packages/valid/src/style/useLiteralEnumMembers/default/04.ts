enum FileAccess {
    None = 0,
    Read = 1,
    Write = 1 << 1,
    All = Read | Write
}
