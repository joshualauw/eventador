<template>
    <aside class="w-full max-w-[20rem] bg-blue-3 p-2 flex flex-col">
        <h1 class="text-lg text-white font-bold flex-center justify-center">
            <Icon name="material-symbols:android-messages" class="mr-2 w-6 h-6" />
            <span class="mr-4">Live Chat</span>
            <DarkMode />
        </h1>
        <div class="mt-8 h-[615px] px-4 overflow-y-auto">
            <p class="badge badge-sm mb-4">joshualauw has joined the stream</p>
            <div v-for="i in 10" class="p-2 mb-4">
                <p class="text-white font-semibold">Joshualauw</p>
                <p class="text-sm text-gray-300">Hello Guys nice stream!</p>
            </div>
        </div>
        <div class="flex-center space-x-2 px-4 mt-8">
            <input type="text" class="input" placeholder="send a message.." />
            <button class="btn btn-sm btn-primary"><Icon name="material-symbols:send" /></button>
        </div>
    </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background-color: rgb(var(--backgroundSecondary) / var(--tw-bg-opacity));
}

::-webkit-scrollbar-thumb {
    background-color: #69717451;
    border-radius: 5px;
    border: 1px solid transparent;
    background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #303a3b2c;
}
</style>
