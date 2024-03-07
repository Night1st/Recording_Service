export interface ISyncManagement {
    date: Date,
    totalConversation: Number,
    noRecording: Number,
    downloadedRecording: Number
}

export const SyncData = [
    {
        date: new Date(2024, 2, 1),
        totalConversation: 170,
        noRecording: 10,
        downloadedRecording: 160
    },
    {
        date: new Date(2024, 2, 1),
        totalConversation: 155,
        noRecording: 14,
        downloadedRecording: 141
    }
]