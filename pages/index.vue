<template>
    <section class="bg-backgroundPrimary">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                    <img
                        alt="Party"
                        src="https://storage.googleapis.com/ekrutassets/blogs/images/000/003/446/original/virtual-event-adalah-EKRUT.jpg"
                        class="absolute inset-0 h-full max-w-full object-cover"
                    />
                </div>
                <div class="lg:py-24">
                    <h2 class="text-content text-3xl font-bold sm:text-4xl">
                        Grow your audience with <span class="text-primary">Eventador!</span>
                    </h2>
                    <p class="my-6 text-content2 text-lg">
                        The best event platform for hybrid and event meeting, we will wait for your arrivance!
                    </p>
                    <NuxtLink to="/home" class="btn btn-success self-center">Get Started</NuxtLink>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-backgroundSecondary">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
            <div class="max-w-xl">
                <h2 class="text-3xl text-content1 font-bold sm:text-4xl">
                    Why <span class="text-primary">Eventador?</span>
                </h2>
                <p class="mt-4 text-content2">
                    Eventador is an exceptional event platform that provides an array of services to both event
                    organizers and attendees. The platform allows users to browse and join many various events easily!
                </p>
            </div>

            <div class="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <div v-for="i in specialityItems" class="flex-center gap-6">
                    <span class="flex-center rounded-lg bg-gray-800 text-white p-3">
                        <Icon :name="i.icon" class="w-6 h-6" />
                    </span>
                    <div>
                        <h2 class="text-lg font-bold">{{ i.name }}</h2>
                        <p class="mt-1 text-sm text-content2">{{ i.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const specialityItems = [
    {
        icon: "mdi:phone-message",
        name: "Livestreaming",
        desc: "Eventador livestreaming feature allows attendees to tune in to events remotely, making it more accessible for those who cannot attend in person",
    },
    {
        icon: "material-symbols:dashboard",
        name: "Event dashboard",
        desc: "Eventador event dashboard provides organizers with a comprehensive set of tools for efficient event management and promotion.",
    },
    {
        icon: "ph:magnifying-glass-plus-bold",
        name: "Browse event",
        desc: "Eventador extensive event listings allow users to browse a diverse range of events, including concerts, festivals, conferences, and more",
    },
    {
        icon: "material-symbols:lab-profile",
        name: "Form builder",
        desc: "Eventador form builder feature enables organizers to create custom forms to collect attendee information and feedback.",
    },
    {
        icon: "mdi:certificate",
        name: "Certificate Builder",
        desc: "Eventador certificate generation feature enhances the attendee experience by providing personalized certificates for event participation.",
    },
    {
        icon: "material-symbols:chat",
        name: "Discussion",
        desc: "Eventador discussion feature allows attendees to discuss event with other participants, facilitating networking and enhancing the event experience.",
    },
];
</script>
