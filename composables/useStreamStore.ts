import { doc, getFirestore, onSnapshot } from "firebase/firestore";

export default function useStreamStore() {
    const stream = useState<IStreamRoom | null>("stream", () => null);

    function subscribe(id: string) {
        const roomRef = doc(getFirestore(), "rooms", id);
        onSnapshot(roomRef, async (doc) => {
            if (doc.exists()) {
                stream.value = { id: doc.id, ...(doc.data() as any) };
            } else {
                stream.value = null;
            }
        });
    }

    return { stream, subscribe };
}
