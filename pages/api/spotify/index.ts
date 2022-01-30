import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import Cookies from "js-cookie";


export abstract class RequestDefaults {
    public static token: string = '';

    public static changeToken(t: string) {
        RequestDefaults.token = t;
    }
}

export const getHeaders = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {

    const token = Cookies.get('accessToken');

    const headers = {
        Authorization: `Bearer ${RequestDefaults.token ?? await token}`,
        "Content-Type": "application/json",
    };

    return await headers;
}