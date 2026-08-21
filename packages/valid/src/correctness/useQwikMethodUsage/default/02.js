import { component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
  const count = useSignal(0);
});

export const useCounter = () => {
  const count = useSignal(0);
  return count;
};
