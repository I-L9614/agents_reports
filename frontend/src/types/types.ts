export interface User {
    id: string,
    agentCode: string,
    fullName: string,
    role: string
}

export interface Report {
    _id: string,
    category: string,
    urgency: string,
    imagePath: string,
    sourceType: string,
    createAt: string
}