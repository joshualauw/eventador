export default function useEventStore() {
    const exploreEventQuery = useState("exploreEventQuery", () => ({
        keyword: "",
        location: "",
        category: "",
        start_price: 0,
        end_price: 500000,
        start_date: null,
        end_date: null,
        wishlist: false,
    }));
    const eventDetail = useState<IEvent | null>("eventDetail", () => null);

    async function getExploreEvents(query?: IExploreEvent.Query) {
        const res = await executeRequest<IExploreEvent.Data>("/event/explore", { method: "GET", query });
        return res.data;
    }

    async function getEventDetail(id: string) {
        const res = await executeRequest<IGetEventDetail.Data>(`/event/${id}/detail`, { method: "GET" });
        return res.data;
    }

    async function getUserEvents() {
        const res = await executeRequest<IUserEvents.Data>("/event/user", { method: "GET" });
        return res.data;
    }

    async function createEvent(body: ICreateEvent.Body) {
        const res = await executeRequest<ICreateEvent.Data>("/event", { method: "POST", body });
        return res;
    }

    async function updateEventDetail(id: string, body: IUpdateEventDetail.Body) {
        const formData = new FormData();

        if (body.banner) formData.append("banner", body.banner);
        formData.append("name", body.name);
        formData.append("description", body.description);
        formData.append("category", body.category);
        formData.append("price", body.price.toString());
        formData.append("start_date", body.start_date);
        formData.append("capacity", body.capacity.toString());

        const res = await executeRequest<IUpdateEventDetail.Data>(`/event/${id}/details`, {
            method: "PUT",
            body: formData,
        });
        return res;
    }

    async function updateEventLocation(id: string, body: IUpdateEventLocation.Body) {
        const res = await executeRequest<IUpdateEventLocation.Data>(`/event/${id}/location`, { method: "PUT", body });
        return res;
    }

    async function updateEventGallery(id: string, body: IUpdateEventGallery.Body) {
        const formData = new FormData();
        body.gallery.forEach((gal) => {
            formData.append("gallery", gal);
        });

        const res = await executeRequest<IUpdateEventGallery.Data>(`/event/${id}/gallery`, {
            method: "PUT",
            body: formData,
        });
        return res;
    }

    async function toogleEventPublicity(id: string) {
        const res = await executeRequest<IToogleEventPublicity.Data>(`/event/${id}/publicity`, { method: "PATCH" });
        return res;
    }

    async function getEventReport(id: string) {
        const res = await executeRequest<IGetEventReport.Data>(`/event/${id}/report`, { method: "GET" });
        return res.data;
    }

    return {
        eventDetail,
        exploreEventQuery,
        getExploreEvents,
        getEventDetail,
        getUserEvents,
        createEvent,
        updateEventDetail,
        updateEventGallery,
        updateEventLocation,
        toogleEventPublicity,
        getEventReport,
    };
}
