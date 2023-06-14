<template>
    <div class="card hover:scale-100 rounded-md h-fit shadow-none">
        <div class="card-body bg-backgroundSecondary p-6">
            <p class="font-bold mb-2">Browse By Tags</p>
            <div>
                <div v-for="i in 5" class="flex-center w-full hover:bg-border p-4 mb-2 rounded-lg cursor-pointer">
                    <div class="w-full">
                        <p class="font-bold">#Event-Mantap</p>
                        <p class="text-sm text-content2">1001 Posts</p>
                    </div>
                    <Icon name="fa:external-link" />
                </div>
            </div>
            <button class="btn btn-sm btn-ghost">Show More...</button>
        </div>
    </div>
</template>
