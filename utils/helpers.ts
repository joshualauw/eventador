import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calcPercent(num1: number, num2: number) {
    if (num1 > num2) return 100;

    const percentage = (num1 / num2) * 100;
    return Math.floor(percentage);
}

export function formatNumber(num: number) {
    return num.toLocaleString("en-US");
}
