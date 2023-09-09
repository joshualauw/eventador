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
                <label class="form-label">Link to Event (optional)</label>
                <div class="form-control popover flex-col w-full">
                    <input
                        @keyup="debounceSearchEvent"
                        v-model="searchTerm"
                        type="text"
                        placeholder="event name.."
                        class="input max-w-full popover-trigger"
                        tabindex="0"
                    />
                    <div class="popover-content w-full mt-2" tabindex="0">
                        <div v-if="pending" class="flex w-full flex-box">
                            <svg class="animate-spin h-4 w-4 mr-3 bg-gray-200" viewBox="0 0 24 24"></svg>
                            <p class="text-mute">Please Wait...</p>
                        </div>
                        <div v-if="eventSuggestions.length == 0 && !pending" class="text-mute text-center">
                            --Search event--
                        </div>
                        <div class="max-h-56 overflow-y-auto">
                            <p
                                v-for="suggest in eventSuggestions"
                                @click="selectEvent(suggest)"
                                class="hover:bg-border p-2 cursor-pointer"
                            >
                                {{ suggest.name }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-if="postState.link" class="card-body flex-row items-center mt-4 p-4 relative flex-wrap">
                    <Icon
                        @click="clearEventLink"
                        name="fa6-solid:xmark"
                        class="text-error absolute top-3 right-3 cursor-pointer"
                    />
                    <img
                        :src="postState.link.banner || '/images/default-event.jpg'"
                        class="rounded-md hidden md:block w-20 h-12 md:mr-2"
                    />
                    <div>
                        <p class="font-semibold text-sm md:text-base">{{ postState.link.name }}</p>
                        <p
                            @click="goToEvent(postState.link)"
                            class="text-xs md:text-sm text-primary hover:underline cursor-pointer"
                        >
                            {{ postState.link.url }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Post Tags</label>
                <div>
                    <span
                        v-for="tag in postState.tags"
                        @click="removeTag(tag.key)"
                        class="badge badge-md md:badge-lg badge-flat-secondary inline-flex w-fit m-1.5 cursor-pointer hover:opacity-80"
                    >
                        #{{ tag.val }}
                    </span>
                    <span class="badge badge-md md:badge-lg badge-outline relative h-full w-32 md:w-40 m-1.5">
                        <input
                            @keydown.enter="addTag"
                            v-model="newTag"
                            type="text"
                            class="outline-none text-xs md:text-sm bg-backgroundPrimary"
                            placeholder="tag.."
                        />
                        <button @click="addTag" class="btn btn-xs md:btn-sm btn-solid-secondary absolute right-2">
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
const searchTerm = ref("");
const eventSuggestions = ref<IPostLink[]>([]);

const { value: postState, reset } = useStateHandler({
    tags: [] as { key: string; val: string }[],
    content: "",
    link: null as IPostLink | null,
    image: null as File | null,
});

const config = useRuntimeConfig();
const { getExploreEvents } = useEventStore();
const { createPost, updatePost, getOnePost } = usePostStore();
const { mutate: createMutate, error, errors, pending } = useMutate(createPost);
const { mutate: updateMutate } = useMutate(updatePost);

onMounted(async () => await searchEvent());

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
                if (res.data.link) {
                    postState.link = res.data.link;
                }
                postState.tags.push(...res.data.tags.map((tag) => ({ key: genId(), val: tag })));
                if (res.data.image) preview.value = res.data.image;
            }
        } else {
            reset();
            preview.value = "";
        }
    }
);

const debounceSearchEvent = useDebounce(searchEvent, 800);

function clearEventLink() {
    postState.link = null;
    searchTerm.value = "";
}

function goToEvent(event: IPostLink) {
    window.open(config.public.baseURL + `/event/${event.id}`, "_blank");
}

function selectEvent(event: IPostLink) {
    postState.link = event;
    searchTerm.value = event.name;
}

async function searchEvent() {
    pending.value = true;
    const res = await getExploreEvents({ keyword: searchTerm.value });
    if (res) {
        eventSuggestions.value = [];
        eventSuggestions.value.push(
            ...res.data.map((ev) => ({
                id: ev._id,
                name: ev.name,
                url: config.public.baseURL + `/event/${ev._id}`,
                banner: ev.banner || "/images/default-event.jpg",
            }))
        );
    }
    pending.value = false;
}

async function savePost(setOpen: (state: boolean) => void) {
    const newPost = {
        image: postState.image,
        tags: postState.tags.map((tag) => tag.val),
        content: formattedText.value,
    };
    if (postState.link) {
        Object.assign(newPost, { link: { ...postState.link } });
    }
    console.log(newPost);

    if (props.context == "create") {
        const res = await createMutate(newPost);
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

        const res = await updateMutate(props.updateId, newPost);

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
