import { POSITION, TYPE } from "vue-toastification";
import { ToastOptions } from "vue-toastification/dist/types/types";

export function createToast(message: string, type: TYPE, custom?: ToastOptions) {
    const toast = useToast();

    const options: ToastOptions = {
        type,
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
        ...custom,
    };

    toast(message, options);
}
