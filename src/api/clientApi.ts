import { apiClient } from "./apiClient";

export type CreateClientPayload = {
  fullName: string;
  age: number;
  gender: string;
  occupation?: string;
};

export type CreateClientResponse = {
  message: string;
  data: {
    clientId: number;
    fullName: string;
    age: number;
    gender: string;
    occupation?: string | null;
    createdAt: string;
  };
};

export async function createClient(payload: CreateClientPayload) {
  const response = await apiClient.post<CreateClientResponse>(
    "/clients",
    payload,
  );

  return response.data;
}
