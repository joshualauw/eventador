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
    latitude: string;
    longitude: string;
}
