export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
    return password.length >= 8;
}

export function validateScriptContent(content: string): boolean {
    return content.trim().length > 0;
}

export function validateGrade(grade: number): boolean {
    return grade >= 0 && grade <= 100;
}