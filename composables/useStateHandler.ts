export function useStateHandler<T extends {}>(initialValue: T) {
    const state = reactive<T>({ ...initialValue });
    const reset = () => {
        Object.assign(state, initialValue);
    };
    return {
        value: state,
        reset: reset,
    };
}
