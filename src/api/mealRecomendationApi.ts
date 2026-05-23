import { apiClient } from "./apiClient";

export async function generateWeeklyMenu(screeningId: number) {
  const response = await apiClient.post(`/meal/${screeningId}/menu-weekly`);

  return response.data;
}

export async function getSavedMenus(screeningId: number) {
  const response = await apiClient.get(`/meal/${screeningId}/menus`);

  return response.data;
}
