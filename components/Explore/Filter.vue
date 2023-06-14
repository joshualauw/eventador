<template>
    <div class="popover">
        <button class="btn btn-md lg:btn-lg btn-primary popover-trigger">
            <Icon name="material-symbols:filter-alt" />
        </button>
        <div
            class="popover-content bg-backgroundSecondary shadow-md border popover-bottom-left w-[350px] lg:w-[400px] mt-1"
            tabindex="0"
        >
            <div class="p-3 text-sm space-y-3">
                <h2 class="text-lg font-semibold">Filter & Search</h2>
                <div class="rounded-full flex-center">
                    <Icon name="fa:search" class="w-5 h-5 mr-2 text-gray-500" />
                    <input type="text" class="input input-sm lg:input-md" placeholder="keyword.." />
                </div>
                <div class="rounded-full flex-center">
                    <Icon name="fa:globe" class="w-5 h-5 mr-2 text-gray-500" />
                    <input type="text" class="input input-sm lg:input-md" placeholder="location.." />
                </div>
                <div class="rounded-full flex-center">
                    <Icon name="fa:caret-down" class="w-5 h-5 mr-2 text-gray-500" />
                    <select class="select select-sm lg:select-md">
                        <option value="all">All</option>
                    </select>
                </div>
                <div class="divider divider-horizontal"></div>
                <div class="rounded-full flex-center">
                    <span class="font-semibold mr-2 text-gray-500">Rp.</span>
                    <input type="number" class="input input-sm lg:input-md mr-1" placeholder="Start price.." />
                    <input type="number" class="input input-sm lg:input-md" placeholder="End price.." />
                </div>
                <div class="rounded-full flex-center">
                    <Icon name="fa:calendar" class="w-8 h-8 mr-4 text-gray-500" />
                    <input type="date" class="input input-sm lg:input-md mr-1" placeholder="Start date.." />
                    <input type="date" class="input input-sm lg:input-md" placeholder="End date.." />
                </div>
                <button class="btn btn-sm lg:btn-md btn-solid-primary float-right">Apply</button>
            </div>
        </div>
    </div>
</template>
