export const gradingRules = {
    minGrade: 0,
    maxGrade: 100,
    passingGrade: 50,
    validateGrade: (grade: number): boolean => {
        return grade >= gradingRules.minGrade && grade <= gradingRules.maxGrade;
    },
    isPassing: (grade: number): boolean => {
        return grade >= gradingRules.passingGrade;
    },
    getGradeCategory: (grade: number): string => {
        if (grade < 50) {
            return 'Fail';
        } else if (grade < 60) {
            return 'Pass';
        } else if (grade < 70) {
            return 'Merit';
        } else {
            return 'Distinction';
        }
    }
};