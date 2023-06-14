<template>
    <div @click="navigateTo('/profile/123')" class="card cursor-pointer">
        <div class="card-body p-6 flex-row flex-center space-x-3 hover:bg-slate-3 relative">
            <div class="avatar avatar-lg avatar-ring">
                <img src="/images/default-user.png" alt="avatar" />
            </div>
            <div>
                <p class="font-semibold text-lg mb-1">Joshualauw</p>
                <p class="text-content2 text-sm">101 followers</p>
                <p class="text-content2 text-sm">5 events created</p>
            </div>
            <button class="rounded-full p-2 flex-center btn-solid-secondary absolute top-4 right-4">
                <Icon name="fa:check" class="w-3 h-3" />
            </button>
        </div>
    </div>
</template>
