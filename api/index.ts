import axios, { AxiosRequestConfig } from "axios";
import { Invoice } from "../store/types";

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

async function refreshToken() {
    try {
        const result = await axios
            .post(
                "http://192.168.100.3:4000/auth/refresh-token",
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
            .post("http://192.168.100.3:4000/auth/login", payload, {
                withCredentials: true,
            })
            .then((res) => res.data)
    );

    if (!result.data) return result;

    localStorage.setItem("access_token", result.data.access_token);
    return result;
}

export async function checkUser() {
    return await resolve<string>(async () => {
        const config = getAccessTokenHeader();
        return axios
            .post(
                "http://192.168.100.3:4000/auth/check-token",
                {},
                { withCredentials: true, ...config }
            )
            .then((res) => {
                return "";
            })
    }
    );
}

export async function getInvoices() {
    return await resolve<Invoice[]>(async () => {
        const config = getAccessTokenHeader();

        return await axios
            .get("http://192.168.100.3:4000/invoice", config)
            .then((res) => res.data);
    });
}

export async function getInvoice(id: string) {
    return await resolve<Invoice>(async () => {
        const config = getAccessTokenHeader();
        return await axios
            .get(`http://192.168.100.3:4000/invoice/${id}`, config)
            .then((res) => res.data);
    });
}

export async function deleteInvoice(id: string) {
    return await resolve<Invoice>(async () => {
        const config = getAccessTokenHeader();
        return await axios
            .delete(`http://192.168.100.3:4000/invoice/${id}`, config)
            .then((res) => res.data);
    });
}

export async function updateInvoice(id: string, invoice: Invoice) {
    return await resolve<Invoice>(async () => {
        const config = getAccessTokenHeader();
        return await axios
            .patch(`http://192.168.100.3:4000/invoice/${id}`, invoice, config)
            .then((res) => res.data);
    });
}

export async function createInvoice(invoice: Invoice) {
    return await resolve<Invoice>(async () => {
        const config = getAccessTokenHeader();
        return await axios
            .post(`http://192.168.100.3:4000/invoice`, invoice, config)
            .then((res) => res.data);
    });
}

function getAccessTokenHeader () {
    const access_token = localStorage.getItem("access_token");
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    return config;
}