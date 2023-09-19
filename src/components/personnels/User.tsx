export default interface User {
    id: number | undefined,
    cin: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    password: string | undefined,
    gender: Gender | undefined,
    roles: Role[],
    birthDate: Date | undefined,
    isActive: boolean | undefined,
    isLoggedIn?: boolean | undefined,
    phoneNumber: string | undefined,
    imagePath: string | undefined,
    salary: number | undefined,
    functionName: string | undefined,
    isDriver: boolean | undefined
}

export enum Gender {
    MALE = 'MALE', FEMALE = 'FEMALE'
}

export interface Role {
    id: number,
    name: string
}