export interface Grade {
    id: string;
    scriptId: string;
    tutorId: string;
    score: number;
    comments?: string;
    createdAt: Date;
    updatedAt: Date;
}