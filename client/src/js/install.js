const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // this will store the event that was triggered
    window.deferredPrompt = event;
    // this will make the button visible
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    //if there was no prompt even then return out of this function
    if(!promptEvent) {
        return;
    }

    // reveal the prompt to the user
    promptEvent.prompt();

    // we can now reset the deferred prompt variable because it is only used one time
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    // if the app is installed we can set the deferredPrompt to null
    window.deferredPrompt = null;
});
