<template>
    <div class="absolute top-8 left-1/3 right-1/3 w-1/3 bg-white shadow-md rounded-xl p-6 z-30">
        <div class="absolute top-2 right-2 btn btn-circle btn-ghost">x</div>
        <div class="w-full">
            <div class="form-group gap-1">
                <label class="form-label">Content</label>
                <input type="text" class="input input-sm max-w-full" placeholder="text content.." />
            </div>
            <div class="flex mt-4 space-x-3">
                <div class="form-group gap-1">
                    <span class="form-label">x position</span>
                    <input type="number" class="input input-sm max-w-full" placeholder="x" />
                </div>
                <div class="form-group gap-1">
                    <span class="form-label">y position</span>
                    <input type="number" class="input input-sm max-w-full" placeholder="y" />
                </div>
            </div>
            <div class="flex mt-4 space-x-3">
                <div class="form-group gap-1">
                    <span class="form-label">Font Size</span>
                    <input type="number" class="input input-sm max-w-full" :value="32" />
                </div>
                <div class="form-group gap-1">
                    <span class="form-label">Text Decoration</span>
                    <div class="flex space-x-2">
                        <button class="btn btn-sm">B</button>
                        <button class="btn btn-sm">I</button>
                        <button class="btn btn-sm">U</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
