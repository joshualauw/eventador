<template>
    <Html :data-theme="$colorMode.value || $colorMode.preference">
        <main class="min-h-screen bg-backgroundPrimary">
            <slot />
        </main>
    </Html>
</template>
