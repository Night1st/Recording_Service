export interface IRestAPI {
    api: string,
    collection: string,
    createdBy: string,
    createdOn: string,
    requestMethod: string,
    requestURL: string,
    status: string,
}

export const RestAPIData = [
    {
        api: "REST.log.1",
        collection: "API1",
        createdBy: "admin",
        createdOn: "01/03/2024 14:00:00",
        requestMethod: "GET",
        requestURL: "",
        status: "Success"
    },
    {
        api: "REST.log.2",
        collection: "API2",
        createdBy: "admin",
        createdOn: "02/03/2024 14:00:00",
        requestMethod: "POST",
        requestURL: "",
        status: "Success"
    },
    {
        api: "REST.log.3",
        collection: "API3",
        createdBy: "admin",
        createdOn: "03/03/2024 14:00:00",
        requestMethod: "GET",
        requestURL: "",
        status: "Failed"
    },
]