interface ICertificate {
    _id: string;
    template: string;
    texts: ICertificateText[];
}

interface ICertificateText {
    color: string;
    content: string;
    options: {
        fontStyle: string;
        fontSize: string;
        fontColor: string;
    };
    state: ICertificatePosition;
}

interface ICertificateImage {
    url: string;
    state: ICertificatePosition;
}

interface ICertificatePosition {
    x: number;
    y: number;
    width: number;
    height: number;
}
