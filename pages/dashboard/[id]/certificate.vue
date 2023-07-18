<template>
    <UILoader v-if="pending" />
    <div class="relative w-screen h-screen">
        <div class="flex flex-col gap-4 flex-center absolute top-2 left-2 p-2 z-50">
            <label v-if="!isPreview" @click="$router.go(-1)" class="btn btn-neutral w-12 h-12 btn-circle">
                <Icon name="material-symbols:arrow-back" class="w-5 h-5 font-extrabold" />
            </label>
            <label v-if="!isPreview" for="certificate-template" class="btn btn-primary w-12 h-12 btn-circle">
                <Icon name="eos-icons:templates-outlined" class="w-5 h-5" />
            </label>
            <button v-if="!isPreview" class="dropdown">
                <label class="btn btn-secondary w-12 h-12 btn-circle" tabindex="0">
                    <Icon name="material-symbols:add" class="w-5 h-5" />
                </label>
                <div class="dropdown-menu dropdown-menu-right ml-2">
                    <p class="dropdown-item text-sm relative">
                        <span class="flex-center"><Icon name="fa:image" class="mr-2" /> Add Image</span>
                        <input @change="addImage" type="file" class="absolute w-full h-full opacity-0" />
                    </p>
                    <p @click="addText" class="dropdown-item text-sm">
                        <span class="flex-center">
                            <Icon name="material-symbols:text-fields" class="mr-2" /> Add Text
                        </span>
                    </p>
                </div>
            </button>
            <label v-if="!isPreview" @click="doSaveCertificate" class="btn btn-success w-12 h-12 btn-circle">
                <Icon name="material-symbols:save" class="w-5 h-5" />
            </label>
            <label @click="isPreview = !isPreview" class="btn btn-error w-12 h-12 btn-circle">
                <Icon :name="isPreview ? 'fa:eye-slash' : 'fa:eye'" class="w-5 h-5" />
            </label>
            <label v-if="isPreview" @click="downloadCertificate" class="btn btn-primary w-12 h-12 btn-circle">
                <Icon name="fa:download" class="w-5 h-5" />
            </label>
        </div>
        <div
            ref="capture"
            class="relative grid grid-cols-4 grid-rows-4 md:grid-cols-7 md:grid-rows-5 xl:grid-cols-10 xl:grid-rows-6 w-full h-full divide-x-2 divide-y-2"
        >
            <img :src="activeTemplate.preview" class="absolute top-0 left-0 w-full h-full z-10" />
            <OrganizerCertificateText v-for="text in texts" @selected="openText" :text="text" />
            <OrganizerCertificateImage v-for="image in images" @selected="openImage" :image="image" />
            <div v-if="!isPreview" v-for="i in 60" class="bg-transparent z-20"></div>
        </div>
    </div>
    <OrganizerCertificateOverlayText
        v-if="overlayText"
        :text="overlayText"
        @deleted="deleteText"
        @closed="overlayText = null"
    />
    <OrganizerCertificateOverlayImage
        v-if="overlayImage"
        :image="overlayImage"
        @deleted="deleteImage"
        @closed="overlayImage = null"
    />
    <OrganizerCertificateTemplate @applied="handleApplied" />
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";
import { toPng } from "html-to-image";
import { saveAs } from "@/assets/js/filesaver";

definePageMeta({
    middleware: ["auth", "participant"],
    owner: true,
});

const images = ref<ICertificateImageExtra[]>([]);
const texts = ref<ICertificateTextExtra[]>([]);
const overlayText = ref<ICertificateTextExtra | null>(null);
const overlayImage = ref<ICertificateImageExtra | null>(null);

const activeTemplate = ref<{ preview: string; file: string }>({
    preview: "/images/certificate/blue.jpg",
    file: "/images/certificate/blue.jpg",
});

const route = useRoute();
const capture = ref();
const { saveCertificate, getCertificate, isPreview } = useCertificateStore();
const { mutate, pending } = useMutate(saveCertificate);
const { data: certificate } = await useAsyncData("getCertificate", () => getCertificate(route.params.id as string));

if (certificate.value) {
    //using base template
    if (certificate.value.data.template.includes(",")) {
        const template = certificate.value.data.template.split(",");
        activeTemplate.value = {
            file: certificate.value.data.template,
            preview: base64ToBlobUrl(template[1], template[0]),
        };
    }
    //using custom template
    else {
        activeTemplate.value = {
            file: certificate.value.data.template,
            preview: certificate.value.data.template,
        };
    }

    texts.value.push(...certificate.value.data.texts.map((txt) => ({ ...txt, id: genId() })));
    images.value.push(
        ...certificate.value.data.images.map((img) => ({
            ...img,
            id: genId(),
            preview: base64ToBlobUrl(img.url.split(",")[1], img.url.split(",")[0]),
        }))
    );
}

async function downloadCertificate() {
    toPng(capture.value, { height: window.innerHeight }).then(function (dataUrl) {
        saveAs(dataUrl, `certificate_${genId()}`);
    });
}

function handleApplied(img: { preview: string; file: string }) {
    activeTemplate.value = img;
}

async function doSaveCertificate() {
    const certificateData = {
        template: activeTemplate.value.file,
        texts: texts.value.map((txt) => exclude(txt, ["id"])),
        images: images.value.map((img) => exclude(img, ["id", "preview"])),
    };
    await mutate(route.params.id as string, certificateData);
}

function openText(text: ICertificateTextExtra) {
    overlayImage.value = null;
    overlayText.value = text;
}
function openImage(image: ICertificateImageExtra) {
    overlayText.value = null;
    overlayImage.value = image;
}

function addImage(event: any) {
    const file = event.target.files[0] as File;
    if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result?.toString()?.split(",")[1];
            if (!base64String) return;

            images.value.push({
                id: genId(),
                preview: URL.createObjectURL(file),
                url: file.type + "," + base64String,
                state: {
                    x: 300,
                    y: 350,
                    width: 60,
                    height: 60,
                },
            });
        };
        reader.readAsDataURL(file);
    } else {
        createToast("File should be an image!", TYPE.ERROR);
    }
}
function addText() {
    texts.value.push({
        id: genId(),
        color: "transparent",
        state: {
            x: 200,
            y: 300,
            width: 400,
            height: 50,
        },
        content: "<insert text here>",
        options: {
            fontStyle: "",
            fontSize: 16,
            fontColor: "black",
        },
    });
}

function deleteImage(id: string) {
    images.value = images.value.filter((img) => img.id !== id);
    overlayImage.value = null;
}
function deleteText(id: string) {
    texts.value = texts.value.filter((txt) => txt.id !== id);
    overlayText.value = null;
}
</script>
