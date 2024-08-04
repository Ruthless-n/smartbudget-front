import { QueryKey } from "@tanstack/react-query";

export const keyAuth = (): QueryKey => ['user', 'auth']
export const keyCurrentUser = (): QueryKey => ['user', 'me']
export const keyCreateUser = (): QueryKey => ['user']