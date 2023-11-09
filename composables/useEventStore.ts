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

    async function getUserEvents(query?: IUserEvents.Query) {
        const res = await executeRequest<IUserEvents.Data>("/event/user", { method: "GET", query });
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

    async function updateEventOverview(id: string, body: IUpdateEventOverview.Body) {
        const res = await executeRequest<IUpdateEventOverview.Data>(`/event/${id}/overview`, { method: "PATCH", body });
        return res;
    }

    async function wishlistEvent(id: string) {
        const res = await executeRequest<IWishlistEvent.Data>(`/event/${id}/wishlist`, { method: "PATCH" });
        return res;
    }

    async function refundEvent(id: string) {
        const res = await executeRequest<IRefundEvent.Data>(`/event/${id}/refund`, { method: "PATCH" });
        return res;
    }

    async function reportEvent(id: string, body: IReportEvent.Body) {
        const res = await executeRequest<IReportEvent.Data>(`/event/${id}/report`, {
            method: "PATCH",
            body,
        });
        return res;
    }

    async function viewEvent(id: string, body: IViewEvent.Body) {
        const res = await executeRequest<IViewEvent.Data>(`/event/${id}/view`, { method: "PUT", body, toast: false });
        return res;
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
        updateEventOverview,
        wishlistEvent,
        refundEvent,
        reportEvent,
        viewEvent,
    };
}
