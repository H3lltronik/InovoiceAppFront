import axios, { AxiosRequestConfig } from "axios";
import { CreateUser, Invoice, User } from "../store/types";

export const resolve = async <T>(todo: () => any) => {
    type Resolved = {
        data: T | null;
        error: T | null;
    };
    let resolved: Resolved = {
        data: null,
        error: null,
    };

    const promise = new Promise<T>(async (resolve, reject) => {
        try {
            const res = await todo();
            resolve(res);
        } catch (e: any) {
            if (e?.response?.status == "401") {
                await refreshToken();

                try {
                    const retry = await todo();
                    resolve(retry);
                } catch (e: any) {
                    reject(e);
                }
            }
            reject(e);
        }
    });

    try {
        resolved.data = await promise;
    } catch (e: any) {
        resolved.error = e;
    }

    return resolved;
};

type LoginPayload = {
    username: string;
    password: string;
};

type LoginResult = {
    access_token: string;
    refresh_token: string;
};

export const serverUrl = "http://192.168.100.3:4000";

async function refreshToken() {
    try {
        const result = await axios
            .post(
                `${serverUrl}/auth/refresh-token`,
                {},
                { withCredentials: true }
            )
            .then((res) => res.data);

        localStorage.setItem("access_token", result.access_token);
    } catch (e: any) {
        console.error("error while trying to refresh token", e);
    }
}

export async function login(payload: LoginPayload) {
    const result = await resolve<LoginResult>(async () =>
        axios
            .post(`${serverUrl}/auth/login`, payload, {
                withCredentials: true,
            })
            .then((res) => res.data)
    );

    if (!result.data) return result;

    localStorage.setItem("access_token", result.data.access_token);
    return result;
}

export async function logout() {
    const result = await resolve<LoginResult>(async () => {
        const result = await axios
            .post(
                `${serverUrl}/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            )
            .then((res) => res.data)
        
        localStorage.removeItem("access_token");

        return result;
    }
        
    );
    return result;
}

export async function checkUser() {
    return await resolve<User>(async () => {
        const config = getAccessTokenHeader();
        return axios
            .post(
                `${serverUrl}/auth/check-token`,
                {},
                { withCredentials: true, ...config }
            )
            .then((res) => res.data);
    });
}

export async function createUser(payload: CreateUser) {
    return await resolve<User>(async () => {
        const config = getAccessTokenHeader();
        return axios
            .post(
                `${serverUrl}/user`,
                payload,
                { withCredentials: true, ...config }
            )
            .then((res) => res.data);
    });
}

export async function getInvoices() {
    return await resolve<Invoice[]>(async () => {
        const config = getAccessTokenHeader();

        return await axios
            .get(`${serverUrl}/invoice`, config)
            .then((res) => res.data);
    });
}

export async function getInvoice(id: string) {
    return await resolve<Invoice>(async () => {
        const config = getAccessTokenHeader();
        return await axios
            .get(`${serverUrl}/invoice/${id}`, config)
            .then((res) => res.data);
    });
}

export async function deleteInvoice(id: string) {
    return await resolve<Invoice>(async () => {
        const config = getAccessTokenHeader();
        return await axios
            .delete(`${serverUrl}/invoice/${id}`, config)
            .then((res) => res.data);
    });
}

export async function updateInvoice(id: string, invoice: Invoice) {
    return await resolve<Invoice>(async () => {
        const config = getAccessTokenHeader();
        return await axios
            .patch(`${serverUrl}/invoice/${id}`, invoice, config)
            .then((res) => res.data);
    });
}

export async function createInvoice(invoice: Invoice) {
    return await resolve<Invoice>(async () => {
        const config = getAccessTokenHeader();
        return await axios
            .post(`${serverUrl}/invoice`, invoice, config)
            .then((res) => res.data);
    });
}

export async function changeProfilePicture(image: string) {
    return await resolve<User>(async () => {
        const config = getAccessTokenHeader();
        config.headers["Content-Type"] = "multipart/form-data";

        const payload = new FormData();
        payload.append('file', image);

        return await axios
            .post(`${serverUrl}/user/profile-picture`, payload, config)
            .then((res) => res.data);
    });
}

function getAccessTokenHeader(): AxiosRequestConfig {
    const access_token = localStorage.getItem("access_token");
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    return config;
}
