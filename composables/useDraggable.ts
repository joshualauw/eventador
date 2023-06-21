export default function useDraggable() {
    const state = reactive({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    function dragMouseDown(e: MouseEvent) {
        e.preventDefault();
        document.onmousemove = dragMouseMove;
        document.onmouseup = dragMouseUp;
    }

    function dragMouseMove(e: MouseEvent) {
        e.preventDefault();
        state.x = e.x;
        state.y = e.y;
    }

    function dragMouseUp(e: MouseEvent) {
        e.preventDefault();
        document.onmousemove = null;
        document.onmouseup = null;
    }

    return { dragMouseDown, state };
}
