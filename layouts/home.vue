<template>
    <NuxtLayout name="default">
        <div class="flex px-8 md:px-36 pt-24 pb-8 md:pb-16 md:pt-28">
            <Sidebar />
            <div class="pl-[20rem]">
                <slot></slot>
            </div>
        </div>
    </NuxtLayout>
</template>
