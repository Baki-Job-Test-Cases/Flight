export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    flights: string[];
}
