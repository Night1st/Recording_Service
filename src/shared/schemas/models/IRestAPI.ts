export interface IRestAPI {
    api: string,
    collection: string,
    createdBy: string,
    createdOn: Date,
    requestMethod: string,
    requestURL: string,
    status: string,
}

export const RestAPIData = [
    {
        api: "REST.log.1",
        collection: "API1",
        createdBy: "admin",
        createdOn: new Date(2024, 2, 1),
        requestMethod: "GET",
        requestURL: "",
        status: "Success"
    },
    {
        api: "REST.log.2",
        collection: "API2",
        createdBy: "admin",
        createdOn: new Date(2024, 2, 2),
        requestMethod: "POST",
        requestURL: "",
        status: "Success"
    },
    {
        api: "REST.log.3",
        collection: "API3",
        createdBy: "admin",
        createdOn: new Date(2024, 2, 3),
        requestMethod: "GET",
        requestURL: "",
        status: "Failed"
    },
]