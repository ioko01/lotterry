import { UserRoles } from "../models/User";

export const pages = [
    {
        name: "หน้าหลัก",
        path: "/",
        as: "/",
        role: ["SUPER_ADMIN", "ADMIN", "AGENT", "EMPLOYEE"] as UserRoles[],
    },
    {
        name: "ประวัติการซื้อ",
        path: "/buyhistory",
        as: "/buyhistory",
        role: ["SUPER_ADMIN", "ADMIN", "AGENT", "EMPLOYEE"] as UserRoles[],
    },
    {
        name: "บัญชีการเงิน",
        path: "/balances",
        as: "/balances",
        role: ["SUPER_ADMIN", "ADMIN", "AGENT", "EMPLOYEE"] as UserRoles[],
    },
    {
        name: "ข้อมูลผู้ใช้",
        path: "/account",
        as: "/account",
        role: ["SUPER_ADMIN", "ADMIN", "AGENT", "EMPLOYEE"] as UserRoles[],
    },
    {
        name: "เพิ่มลูกทีม",
        path: "/adduser",
        as: "/adduser",
        role: ["SUPER_ADMIN"] as UserRoles[],
    },
    {
        name: "เพิ่มล็อตเตอรี่",
        path: "/addlotterry",
        as: "/addlotterry",
        role: ["SUPER_ADMIN"] as UserRoles[],
    },
    {
        name: "สลากทั้งหมด",
        path: "/totallotterry",
        as: "/totallotterry",
        role: ["SUPER_ADMIN"] as UserRoles[],
    },
];
