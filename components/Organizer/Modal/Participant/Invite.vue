<template>
    <UIModal modal-id="invite-participant-modal">
        <h2 class="text-center text-xl font-semibold text-content1">Invite Participant</h2>
        <form class="space-y-4 mt-4">
            <div class="form-group">
                <label class="form-label">User Email</label>
                <input type="text" class="input max-w-full" placeholder="user email.." />
                <textarea class="h-24 w-full textarea resize-none" placeholder="greetings.."></textarea>
                <p class="text-mute">*participant will be sent invitational code</p>
            </div>
            <p><input type="checkbox" class="checkbox" /><span class="text-mute ml-2">Invite as organizer</span></p>
            <div class="form-group pt-6">
                <button type="button" class="btn btn-primary w-full">Send Invitation</button>
            </div>
        </form>
    </UIModal>
</template>
