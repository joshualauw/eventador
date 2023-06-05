<template>
    <article class="sticky h-[350px] top-10">
        <div class="card bg-gray-100 rounded-md shadow-none">
            <div class="card-body p-6">
                <p class="font-bold mb-2">Browse By Tags</p>
                <div>
                    <div v-for="i in 5" class="flex-center w-full hover:bg-gray-200 p-4 mb-2 rounded-lg cursor-pointer">
                        <div class="w-full">
                            <p class="font-bold">#Event-Mantap</p>
                            <p class="text-sm text-gray-800">1001 Posts</p>
                        </div>
                        <Icon name="fa:external-link" />
                    </div>
                </div>
                <button class="btn btn-sm btn-ghost">Show More...</button>
            </div>
        </div>
    </article>
</template>
