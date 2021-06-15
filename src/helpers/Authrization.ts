import { User, UserRoles } from "./../models/User";
export const isAuthorization = (user: User, authorize: UserRoles[]) => {
    if (user) {
        const isAuthorize = authorize.find((role) => user.role === role);
        console.log(isAuthorize);
        return isAuthorize;
    }
};
