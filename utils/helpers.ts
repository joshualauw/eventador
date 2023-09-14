import dayjs from "dayjs";

export function calcPercent(num1: number, num2: number) {
    if (num1 > num2) return 100;

    const percentage = (num1 / num2) * 100;
    return Math.floor(percentage);
}

export function formatNumber(num: number) {
    return num.toLocaleString("en-US");
}

export function genId(length: number = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(length), () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

export function getWeekDays() {
    const today = dayjs();
    const startOfWeek = today.subtract(1, "week");
    const dateList = [];
    for (let i = 1; i < 8; i++) {
        const date = startOfWeek.add(i, "day");
        dateList.push(date);
    }

    return dateList.map((d) => d.format("DD MMM"));
}

export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result?.toString()?.split(",")[1];
            if (base64String) {
                resolve(base64String);
            } else {
                reject(new Error("Failed to convert Blob to Base64."));
            }
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsDataURL(blob);
    });
}

export function base64ToBlobUrl(base64String: string, type: string): string {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type }); // Adjust the type based on your image format
    return URL.createObjectURL(blob);
}

export function getTypeColor(type: string) {
    if (type == "reguler") return "text-primary";
    if (type == "invited") return "text-warning";
    else return "text-secondary";
}

export function getBadgeColor(type: IParticipantType) {
    if (type == "owner") return "text-secondary";
    if (type == "organizer") return "text-secondary";
    if (type == "invited") return "text-warning";
    else return "text-primary";
}

export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
    const newObj = { ...obj };
    for (const key of keys) {
        delete newObj[key];
    }
    return newObj;
}

//@ts-ignore
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};

export function emailCensor(email: string): string {
    const parts = email.split("@");
    if (parts.length !== 2) {
        return email;
    }

    const [username, domain] = parts;
    const usernameLength = username.length;

    if (usernameLength <= 2) {
        return email;
    }

    const firstChar = username[0];
    const lastChar = username[usernameLength - 1];
    const middleChars = "*".repeat(usernameLength - 2);

    const censoredUsername = `${firstChar}${middleChars}${lastChar}`;
    return `${censoredUsername}@${domain}`;
}
