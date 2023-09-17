export default interface User {
    id: number,
    cin: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: Gender,
    roles: { id: number, role: string }[],
    birthDate: Date,
    isActive: boolean,
    isLoggedIn: boolean,
    phoneNumber: string,
    imagePath: string,
    salary: number,
    functionName: string
}

export enum Gender {
    MALE = 'MALE', FEMALE = 'FEMALE'
}