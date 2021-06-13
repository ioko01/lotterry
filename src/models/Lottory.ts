export interface Lottory {
    id: number;
    path: string;
    imageName: string;
    title: string;
    extension: string;
    number: LottoryNumber;
    time: string;
    amount: number;
    price: number;
    note?: string;
}

export interface LottoryNumber {
    oneDigit: number;
    twoDigit: number;
    threeDigit: number;
    fourDigit: number;
    fiveDigit: number;
    sixDigit: number;
    frontThreeDigit: number;
    behindThreeDigit: number;
    behindTwoDigit: number;
}
