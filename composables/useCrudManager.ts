export default function useCrudManager() {
    const actionContext = ref<"create" | "update">("create");
    const actionId = ref("");
    const actionLabel = ref("");

    function handleDeleting(id: string, label: string) {
        actionId.value = id;
        actionLabel.value = label;
    }

    function handleCreating() {
        actionId.value = "";
        actionContext.value = "create";
    }

    function handleUpdating(id: string) {
        actionId.value = id;
        actionContext.value = "update";
    }

    return {
        actionContext,
        actionId,
        actionLabel,
        handleDeleting,
        handleCreating,
        handleUpdating,
    };
}
