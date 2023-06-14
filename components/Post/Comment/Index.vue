<template>
    <div class="flex-between w-full my-8">
        <p class="font-semibold text-lg">All Comments (12)</p>
        <div class="dropdown">
            <button class="btn btn-circle"><Icon name="material-symbols:sort" /></button>
            <div class="dropdown-menu mt-1 w-40 border dropdown-menu-bottom-left">
                <a class="dropdown-item text-sm">Latest</a>
                <a class="dropdown-item text-sm">Most Liked</a>
            </div>
        </div>
    </div>
    <PostCommentItem v-for="i in 3" />
</template>
