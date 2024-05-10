export enum SubType {
    Public = "Public", Private = "Private", Single = 'Single'
} 

export type Sub =  {
    "id": string,
    "price": number,
    "type": SubType,
    "countDays": number,
    "createdAt": Date
  }