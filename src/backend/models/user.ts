export interface User {
    id: string;
    username: string;
    password: string;
    role: 'student' | 'tutor';
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserModel {
    constructor(public user: User) {}

    static fromJson(json: any): UserModel {
        return new UserModel({
            id: json.id,
            username: json.username,
            password: json.password,
            role: json.role,
            email: json.email,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
    }

    toJson(): any {
        return {
            id: this.user.id,
            username: this.user.username,
            password: this.user.password,
            role: this.user.role,
            email: this.user.email,
            createdAt: this.user.createdAt.toISOString(),
            updatedAt: this.user.updatedAt.toISOString(),
        };
    }
}