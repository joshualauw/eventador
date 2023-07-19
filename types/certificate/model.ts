interface ICertificate {
    _id: string;
    template: string;
    texts: ICertificateText[];
    images: ICertificateImage[];
}

interface ICertificateText {
    color: string;
    content: string;
    options: {
        fontStyle: string;
        fontSize: number;
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

type ICertificateImageExtra = ICertificateImage & { id: string; preview: string };
type ICertificateTextExtra = ICertificateText & { id: string };
