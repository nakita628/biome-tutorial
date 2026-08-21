const dispatch = useDispatch();
// No need to list `dispatch` as dependency since it doesn't change
const doAction = useCallback(() => dispatch(someAction()), []);
