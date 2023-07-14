interface IEvent {
    _id: string;
    name: string;
    description: string;
    category: string;
    start_date: string;
    banner?: string;
    gallery: string[];
    price: number;
    capacity: number;
    overview: string;
    location: IEventLocation;
    discussion: IDiscussion;
    certificate: ICertificate;
    user_id: string;
    is_published: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

interface IEventLocation {
    name: string;
    venue: string;
    latitude: number;
    longitude: number;
}

namespace IExploreEvent {
    export interface Query {
        keyword: string;
        location: string;
        category: string;
        start_price: number;
        end_price: number;
        start_date: Date | null;
        end_date: Date | null;
        wishlist: boolean;
    }

    export type Data = ApiResponse<
        Pick<IEvent, "_id" | "name" | "price" | "banner" | "category" | "location" | "capacity" | "start_date">[]
    >;
}

namespace IGetEventDetail {
    export type Data = ApiResponse<{
        event: IEvent & {
            slotLeft: number;
            owner: { _id: string; username: string; profile?: string; followers_count: number };
        };
        eventItinenaries: IItinenary[];
        eventSponsor: ISponsor[];
    }>;
}

namespace IUserEvents {
    export type Data = ApiResponse<{
        managed: (Pick<IEvent, "_id" | "name" | "capacity"> & { publicity: string; total_participants: number })[];
        attended: (Pick<IEvent, "_id" | "name" | "capacity"> & { publicity: string; total_participants: number })[];
    }>;
}

namespace ICreateEvent {
    export interface Body {
        name: string;
        start_date: string;
        category: string;
    }

    export type Data = ApiResponse<IEvent>;
}

namespace IUpdateEventDetail {
    export type Body = {
        banner: File | null;
        name: string;
        description: string;
        category: string;
        price: number;
        start_date: string;
        capacity: number;
    };
    export type Data = ApiResponse<IEvent>;
}

namespace IUpdateEventLocation {
    export type Body = {
        name: string;
        venue: string;
        latitude: number;
        longitude: number;
    };
    export type Data = ApiResponse<IEvent>;
}

namespace IUpdateEventGallery {
    export type Body = {
        gallery: File[];
    };
    export type Data = ApiResponse<IEvent>;
}

namespace IToogleEventPublicity {
    export type Data = ApiResponse<IEvent>;
}
