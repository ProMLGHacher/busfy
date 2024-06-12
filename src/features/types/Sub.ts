export type SubType = "Public" | "Private" | "Single"

export type Sub = {
    "id": string,
    "price": number,
    "type": SubType,
    "countDays": number,
    "createdAt": Date,
    "subscriptionId": string
}

