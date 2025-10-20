export type User = {
    id: string;
    username: string;
    email: string;
    role: 'student' | 'tutor';
};

export type Script = {
    id: string;
    userId: string;
    content: string;
    submittedAt: Date;
};

export type Grade = {
    id: string;
    scriptId: string;
    tutorId: string;
    score: number;
    feedback: string;
    gradedAt: Date;
};

export type SyncStatus = {
    isSyncing: boolean;
    lastSynced: Date | null;
};