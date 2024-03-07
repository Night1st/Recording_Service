export interface IRecording {
    channel: string,
    division: string,
    queue: string,
    originatingDirection: string,
    conversationId: string,
    agent: string,
    remote: string,
    wrapUpCode: string,
    conversationStart: Date
}

export const RecordingData = [
    {
        channel: "voice",
        division: "Home",
        queue: "VPS_Money",
        originatingDirection: "Inbound",
        conversationId: "d9c78845-3e1a-41df-9189-2c3d587f437c",
        agent: "Agent1",
        remote: "tel:8062",
        wrapUpCode: "Default Wrap-up Code",
        conversationStart: new Date(2024, 3, 1)
    },
    {
        channel: "email",
        division: "Home",
        queue: "VPS_Email_DVKH",
        originatingDirection: "Inbound",
        conversationId: "ff2dd6b2-6c35-4f4e-a4f2-80935b7e09d4",
        agent: "Agent1",
        remote: "minhkhanhhoang2710@gmail.com",
        wrapUpCode: "Default Wrap-up Code",
        conversationStart: new Date(2024, 3, 2)
    }
]