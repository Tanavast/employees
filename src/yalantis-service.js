import * as axios from "axios";

const list = axios.create({
    baseURL: 'https://yalantis-react-school-api.yalantis.com/api/task0',
    headers: {
        'Content-type': 'application/json',
    }
});

export const usersAPI = {
    users() {
        return list.get(`/users`);
    },
}
