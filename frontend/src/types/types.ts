export interface User {
    id: string,
    agentCode: string,
    fullName: string,
    role: string
}

export interface Report {
    id: string,
    category: string,
    urgency: string,
    message: string,
    imagePath: string,
    sourceType: string,
    createdAt: string
}