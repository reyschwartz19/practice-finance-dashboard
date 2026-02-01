export interface RegisterDTO{
    email: string;
    password: string;
    username: string;
}

export interface loginDTO{
    email: string;
    password: string;
}

export interface jwtPayload{
    userId: string;
    role: string;
}

