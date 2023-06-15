export function calcPercent(num1: number, num2: number) {
    if (num1 > num2) return 100;

    const percentage = (num1 / num2) * 100;
    return Math.floor(percentage);
}

export function formatNumber(num: number) {
    return num.toLocaleString("en-US");
}

export function genId(length: number = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));

    return Array.from(Array(length), () => randomChar).join("");
}
