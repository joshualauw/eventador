<template>
    <UIModal v-slot="{ setOpen }" classes="max-w-[800px]" modal-id="edit-post-modal">
        <div class="flex flex-col gap-2">
            <h2 class="text-center text-2xl font-semibold text-content1">
                {{ context == "create" ? "Create" : "Edit" }} Post
            </h2>
            <p class="mx-auto max-w-xs text-sm text-content2">Tell your thoughts to the public</p>
        </div>
        <div class="form-group space-y-4">
            <div class="form-field">
                <label class="form-label">Post Image</label>
                <div class="form-control flex-col">
                    <input @change="handleFileChange" type="file" class="input-file max-w-full" />
                </div>
            </div>
            <img v-if="preview" :src="preview" class="mx-auto max-h-48 rounded-md" />
            <div class="form-field">
                <label class="form-label">Post Content</label>
                <div class="form-control flex-col">
                    <textarea
                        @keypress.enter.prevent="triggger"
                        v-model="postState.content"
                        placeholder="post content.."
                        class="textarea h-48 resize-none"
                    ></textarea>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Post Tags</label>
                <div>
                    <span
                        v-for="tag in postState.tags"
                        @click="removeTag(tag.key)"
                        class="badge badge-lg badge-flat-secondary inline-flex w-fit m-1.5 cursor-pointer hover:opacity-80"
                    >
                        #{{ tag.val }}
                    </span>
                    <span class="badge badge-lg badge-outline relative h-full w-40">
                        <input
                            @keydown.enter="addTag"
                            v-model="newTag"
                            type="text"
                            class="outline-none text-sm bg-backgroundPrimary"
                            placeholder="tag.."
                        />
                        <button @click="addTag" class="btn btn-sm btn-solid-secondary btn-rounded absolute right-2">
                            <Icon name="material-symbols:add" />
                        </button>
                    </span>
                </div>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-field pt-5">
                <div class="form-control justify-between">
                    <button
                        @click="savePost(setOpen)"
                        type="button"
                        class="btn btn-primary btn-rounded w-full"
                        :class="{ 'btn-loading': pending }"
                    >
                        Save Post
                    </button>
                </div>
            </div>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";

const props = defineProps<{ context: "update" | "create"; updateId: string }>();
const emits = defineEmits<{ (e: "saved"): void }>();

const newTag = ref("");
const preview = ref("");

const { value: postState, reset } = useStateHandler({
    tags: [] as { key: string; val: string }[],
    content: "",
    image: null as File | null,
});

const { createPost, updatePost, getOnePost } = usePostStore();
const { mutate: createMutate, error, errors, pending } = useMutate(createPost);
const { mutate: updateMutate } = useMutate(updatePost);

watch(
    () => props.updateId,
    async (val) => {
        error.value = null;
        errors.value = [];

        if (props.context == "update") {
            const res = await getOnePost(val);
            if (res) {
                postState.content = res.data.content.replaceAll("<br/>", "\n");
                postState.tags = [];
                postState.tags.push(...res.data.tags.map((tag) => ({ key: genId(), val: tag })));
                if (res.data.image) preview.value = res.data.image;
            }
        } else {
            reset();
            preview.value = "";
        }
    }
);

async function savePost(setOpen: (state: boolean) => void) {
    if (props.context == "create") {
        const res = await createMutate({
            ...postState,
            tags: postState.tags.map((tag) => tag.val),
            content: formattedText.value,
        });
        if (res.status) {
            emits("saved");
            reset();
            preview.value = "";
            setOpen(false);
        }
    }
    //
    if (props.context == "update") {
        pending.value = true;
        error.value = null;
        errors.value = [];

        const res = await updateMutate(props.updateId, {
            ...postState,
            tags: postState.tags.map((tag) => tag.val),
            content: formattedText.value,
        });

        pending.value = false;
        if (res.status) {
            emits("saved");
            setOpen(false);
        } else {
            error.value = res.error;
            errors.value.push(...res.errors);
        }
    }
}

const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
        postState.image = file;
        preview.value = URL.createObjectURL(file);
    } else {
        createToast("file should be an image!", TYPE.ERROR);
    }
};

function addTag() {
    if (newTag.value && !postState.tags.map((tag) => tag.val).includes(newTag.value)) {
        postState.tags.push({ key: genId(), val: newTag.value });
        newTag.value = "";
    }
}

function removeTag(key: string) {
    postState.tags = postState.tags.filter((tag) => tag.key !== key);
}

function triggger() {
    postState.content += "\n";
}

const formattedText = computed(() => postState.content.replace(/\n/g, "<br/>"));
</script>
