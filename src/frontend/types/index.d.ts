export type User = {
    id: string;
    username: string;
    role: 'student' | 'tutor';
    email: string;
};

export type Script = {
    id: string;
    studentId: string;
    content: string;
    submittedAt: Date;
    markedAt?: Date;
    gradeId?: string;
};

export type Grade = {
    id: string;
    scriptId: string;
    score: number;
    feedback: string;
};

export type SyncStatus = {
    isOnline: boolean;
    lastSync: Date | null;
};

export type AuthResponse = {
    token: string;
    user: User;
};

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};