export interface IRestAPI {
    id: number,
    api: string,
    collection: string,
    createdBy: string,
    createdOn: Date,
    requestMethod: string,
    requestURL: string,
    status: string,
    params: Object,
    headers: Object,
    responses: Object
}

export const RestAPIData = [
    {
        id: 1,
        api: "REST.log.1",
        collection: "API1",
        createdBy: "admin",
        createdOn: new Date(2024, 2, 1),
        requestMethod: "GET",
        requestURL: "",
        status: "Success",
        params: {
            "arg": [
                {
                    "phoneNumber": "tel:8062"
                }
            ]
        },
        headers: {
            "Content-Type": "application/json"
        },
        responses: {
            "IVR": "Yes",
            "birthdayCheck": "No",
            "blackListCheck": "No",
            "custPriority": 0,
            "customerStatus": "Yes",
            "firstTime": "No"
        }
    },
    {
        id: 2,
        api: "REST.log.2",
        collection: "API2",
        createdBy: "admin",
        createdOn: new Date(2024, 2, 2),
        requestMethod: "POST",
        requestURL: "",
        status: "Success",
        params: {
            "arg": [
                {
                    "phoneNumber": "tel:8062"
                }
            ]
        },
        headers: {
            "Content-Type": "application/json"
        },
        responses: {
            "IVR": "Yes",
            "birthdayCheck": "No",
            "blackListCheck": "No",
            "custPriority": 0,
            "customerStatus": "Yes",
            "firstTime": "No"
        }
    },
    {
        id: 3,
        api: "REST.log.3",
        collection: "API3",
        createdBy: "admin",
        createdOn: new Date(2024, 2, 3),
        requestMethod: "GET",
        requestURL: "",
        status: "Failed",
        params: {
            "arg": [
                {
                    "phoneNumber": "tel:8062"
                }
            ]
        },
        headers: {
            "Content-Type": "application/json"
        },
        responses: {
            "IVR": "Yes",
            "birthdayCheck": "No",
            "blackListCheck": "No",
            "custPriority": 0,
            "customerStatus": "Yes",
            "firstTime": "No"
        }
    },
]