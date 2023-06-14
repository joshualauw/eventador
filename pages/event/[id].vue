<template>
    <Navbar class="px-8 xl:px-24" />
    <div class="web-container">
        <div class="flex flex-col lg:flex-row">
            <img
                src="/images/default-post.png"
                class="max-h-72 lg:max-h-[500px] w-full rounded-lg border border-backgroundSecondary"
            />
            <div class="h-36 lg:h-[500px] flex lg:block overflow-y-auto">
                <img
                    v-for="i in 4"
                    src="/images/default-event.jpg"
                    class="w-1/3 h-28 lg:h-1/3 lg:w-full border border-backgroundSecondary"
                />
            </div>
        </div>
        <h1 class="text-xl lg:text-3xl font-extrabold mt-8">Maximizing Your Productivity at Work</h1>
        <div class="mt-8 flex flex-col lg:flex-row w-full lg:space-x-24">
            <div class="w-full lg:w-[60%] space-y-8 lg:space-y-10">
                <div class="card hover:scale-100">
                    <div class="card-body flex-row flex-between p-5">
                        <div @click="navigateTo('/profile/123')" class="flex-center space-x-4 cursor-pointer">
                            <div class="avatar">
                                <img src="/images/default-user.png" />
                            </div>
                            <div>
                                <p>By: <span class="font-bold">Joshualauw</span></p>
                                <p class="text-content2 text-sm mt-1">101 followers</p>
                            </div>
                        </div>
                        <button class="btn btn-primary">Follow +</button>
                    </div>
                </div>
                <h2 class="text-lg lg:text-xl font-semibold">Description</h2>
                <p class="text-content2 text-sm lg:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, pariatur non. Ducimus excepturi
                    eaque alias quia natus aut deserunt hic modi, accusantium repellat asperiores inventore, optio
                    architecto, obcaecati temporibus ipsa. <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates cumque odio ducimus tenetur
                    voluptas facere dicta nemo, illum magni, officiis, sapiente nam labore ex nesciunt mollitia deleniti
                    porro ratione nobis.
                </p>
                <h2 class="text-lg lg:text-xl font-semibold">When & Where</h2>
                <div class="flex space-x-8">
                    <div class="flex items-start w-80">
                        <div class="p-3 rounded-lg bg-backgroundSecondary mr-3">
                            <icon name="material-symbols:timer" size="20" />
                        </div>
                        <div>
                            <p class="font-bold">Date & Time</p>
                            <p class="text-sm text-content2 mt-1">Mon, 21 June 2023, 10:30</p>
                        </div>
                    </div>
                    <div class="flex items-start w-80">
                        <div class="p-3 rounded-lg bg-backgroundSecondary mr-3">
                            <icon name="material-symbols:location-on" size="20" />
                        </div>
                        <div>
                            <p class="font-bold">Location</p>
                            <p class="text-sm text-content2 mt-1">iSTTS, East Java, Surabaya, Indonesia</p>
                        </div>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5539948305122!2d112.75681197442684!3d-7.29147626595731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbb476048727%3A0x5f5f7cf736ae643e!2sInstitut%20Sains%20dan%20Teknologi%20Terpadu%20Surabaya!5e0!3m2!1sid!2sid!4v1686227163583!5m2!1sid!2sid"
                    class="border w-full h-72 lg:h-80"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div class="w-full lg:w-[40%] space-y-8">
                <div class="card hover:scale-100 text-center">
                    <div class="card-body">
                        <p class="text-3xl text-success font-bold">Rp. 25.000,00</p>
                        <p>98 Slots Left</p>
                        <button class="btn btn-error mt-3">Register Now</button>
                    </div>
                </div>
                <h2 class="text-xl font-semibold">Sponsored By</h2>
                <div class="flex flex-wrap">
                    <img v-for="i in 3" src="/images/default-post.png" class="w-24 h-24 m-3" />
                </div>
                <h2 class="text-xl font-semibold">Share Now</h2>
                <div class="flex space-x-3">
                    <div v-for="link in socialMediaLinks" :content="link.tooltip" placement="top">
                        <button @click="link.callback" class="btn btn-circle btn-solid-secondary">
                            <icon :name="link.icon" size="24" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const socialMediaLinks = [
    {
        tooltip: "Copy Link",
        icon: "material-symbols:share",
        callback: () => {},
    },
    {
        tooltip: "Facebook Share",
        icon: "mdi:facebook",
        callback: () => {},
    },
    {
        tooltip: "Whatsapp Share",
        icon: "mdi:whatsapp",
        callback: () => {},
    },
];
</script>
