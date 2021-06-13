import { User } from "./User";

export const user: User[] = [
    {
        id: "1",
        username: "superadmin",
        password: "superadmin",
        parent: null,
        child: {
            ADMID: "2",
            AGEID: null,
            EMPID: null,
        },
        role: "SUPER_ADMIN",
        status: "REGULAR",
        createAt: new Date(Date.now()),
        updateAt: new Date(Date.now()),
        lastActive: new Date(Date.now()),
        tokenVersion: 0,
    },
    {
        id: "2",
        username: "admin1",
        password: "admin1",
        parent: {
            SADMID: "1",
            ADMID: null,
            AGEID: null,
        },
        child: null,
        role: "ADMIN",
        status: "REGULAR",
        createAt: new Date(Date.now()),
        updateAt: new Date(Date.now()),
        lastActive: new Date(Date.now()),
        tokenVersion: 0,
    },
];
