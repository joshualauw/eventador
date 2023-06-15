export default function useCrudManager() {
    const actionContext = ref<"create" | "update">("create");
    const actionId = ref("");
    const actionLabel = ref("");

    function setAction(id: string) {
        actionId.value = id;
    }

    function handleDeleting(id: string, label: string) {
        setAction(id);
        actionLabel.value = label;
    }

    function handleCreating() {
        actionId.value = "";
        actionContext.value = "create";
    }

    function handleUpdating(id: string) {
        setAction(id);
        actionContext.value = "update";
    }

    return {
        actionContext,
        actionId,
        actionLabel,
        setAction,
        handleDeleting,
        handleCreating,
        handleUpdating,
    };
}
