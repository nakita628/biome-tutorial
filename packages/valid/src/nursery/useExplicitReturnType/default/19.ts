// A function is a default parameter with a type annotation
type CallBack = () => void;
var f = (gotcha: CallBack = () => { }): void => { };
