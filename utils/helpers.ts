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
    for (let i = 0; i < 7; i++) {
        const date = startOfWeek.add(i, "day");
        dateList.push(date);
    }

    return dateList.map((d) => d.format("DD MMM"));
}

export function getTypeColor(type: string) {
    if (type == "reguler") return "text-primary";
    if (type == "invited") return "text-warning";
    else return "text-secondary";
}
