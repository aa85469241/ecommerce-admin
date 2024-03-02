import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export function emailFormat(email: string) {
    const isGoogleAuth = email.includes("googleauth-");

    if (isGoogleAuth) {
        return email.replace("googleauth-", "");
    }

    return email
}

export const dateFormat = (date: Date) => {
    const dateWithoutTime = date.toISOString().split("T0", 1);
    const time = date.toLocaleTimeString();

    return dateWithoutTime + ", " + time;
}