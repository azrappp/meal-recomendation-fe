import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { ClientList } from "../components/ClientList";
import { MenuCalendar } from "../components/MenuCalendar";
import { MenuByDateView } from "../components/MenuByDateView";
import { ClientDetailTabs } from "../components/ClientDetailTabs";
import { ClientScreeningCharts } from "../components/ClientScreeningCharts";
import {
  ScreeningInputForm,
  type CreateScreeningPayload,
} from "../components/ScreeningInputForm";

type Client = {
  clientId: number;
  fullName: string;
  age: number;
  gender: string;
};

type ActiveTab = "screening" | "menu";
type ClientMenuDate = {
  menuDayId: number;
  menuRecommendationId: number;
  screeningId: number;
  dietType: string;
  dayNumber: number;
  menuDate: string;
  generatedAt: string;
  summary: {
    energyKcal: number;
    proteinG: number;
    fatG: number;
    carbG: number;
  };
};

type MenuByDateResponse = {
  client: Client;
  menuRecommendationId: number;
  screeningId: number;
  dietType: string;
  targetEnergyKcal: number;
  targetCarbohydrateG: number;
  targetProteinG: number;
  targetFatG: number;
  day: {
    menuDayId: number;
    dayNumber: number;
    menuDate: string;
    summary: {
      energyKcal: number;
      proteinG: number;
      fatG: number;
      carbG: number;
      sodiumMg: number;
      fiberG: number;
    };
    meals: {
      mealTime: string;
      items: {
        menuItemId: number;
        foodName: string;
        categoryCode: string;
        portion: number;
        urt: string | null;
        gram: number | null;
        isEaten: boolean;
        eatenAt: string | null;
        userNote: string | null;
      }[];
    }[];
  };
};

type ScreeningChartData = {
  screeningDate: string;

  weightKg: number | null;
  bmi: number | null;
  waistCircumferenceCm: number | null;

  fastingGlucoseMgDl: number | null;
  postprandialGlucoseMgDl: number | null;
  randomGlucoseMgDl: number | null;
  hba1cPercent: number | null;

  systolicBp: number | null;
  diastolicBp: number | null;
};

type ClientScreeningHistory = {
  client: {
    clientId: number;
    fullName: string;
    age: number;
    gender: string;
    occupation: string | null;
    createdAt: string;
  };
  totalScreenings: number;
  chartData: ScreeningChartData[];
  history: any[];
};
export function ClientMenuCalendarPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [menu, setMenu] = useState<MenuByDateResponse | null>(null);
  const [menuDates, setMenuDates] = useState<ClientMenuDate[]>([]);
  const [screeningHistory, setScreeningHistory] =
    useState<ClientScreeningHistory | null>(null);
  const [loadingScreeningHistory, setLoadingScreeningHistory] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [loadingMenuDates, setLoadingMenuDates] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("screening");
  const [savingScreening, setSavingScreening] = useState(false);
  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchScreeningHistory(clientId: number) {
    try {
      setLoadingScreeningHistory(true);
      setError(null);

      const response = await apiClient.get(
        `/clients/${clientId}/screening-history`,
      );

      setScreeningHistory(response.data.data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ??
          error.message ??
          "Failed to fetch screening history",
      );
    } finally {
      setLoadingScreeningHistory(false);
    }
  }
  useEffect(() => {
    if (!selectedClient) {
      setMenu(null);
      setMenuDates([]);
      setScreeningHistory(null);
      return;
    }

    fetchMenuDates(selectedClient.clientId);
    fetchMenuByDate(selectedClient.clientId, selectedDate);
    fetchScreeningHistory(selectedClient.clientId);
  }, [selectedClient]);

  useEffect(() => {
    if (selectedClient) {
      fetchMenuByDate(selectedClient.clientId, selectedDate);
    }
  }, [selectedDate]);

  async function fetchClients() {
    try {
      setLoadingClients(true);
      setError(null);

      const response = await apiClient.get("/clients");

      setClients(response.data.data ?? []);
    } catch (error: any) {
      setError(
        error.response?.data?.message ??
          error.message ??
          "Failed to fetch clients",
      );
    } finally {
      setLoadingClients(false);
    }
  }

  async function fetchMenuDates(clientId: number) {
    try {
      setLoadingMenuDates(true);
      setError(null);

      const response = await apiClient.get(
        `/meal/clients/${clientId}/menu-dates`,
      );

      setMenuDates(response.data.data ?? []);
    } catch (error: any) {
      setError(
        error.response?.data?.message ??
          error.message ??
          "Failed to fetch menu dates",
      );
    } finally {
      setLoadingMenuDates(false);
    }
  }

  async function fetchMenuByDate(clientId: number, date: string) {
    try {
      setLoadingMenu(true);
      setError(null);
      setMenu(null);

      const response = await apiClient.get(
        `/meal/clients/${clientId}/menu-by-date`,
        {
          params: {
            date,
          },
        },
      );

      setMenu(response.data.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setMenu(null);
        return;
      }

      setError(
        error.response?.data?.message ??
          error.message ??
          "Failed to fetch menu",
      );
    } finally {
      setLoadingMenu(false);
    }
  }
  async function handleSubmitScreening(payload: CreateScreeningPayload) {
    if (!selectedClient) return;

    try {
      setSavingScreening(true);
      setError(null);

      await apiClient.post(
        `/clients/${selectedClient.clientId}/screenings`,
        payload,
      );

      await fetchScreeningHistory(selectedClient.clientId);
    } catch (error: any) {
      setError(
        error.response?.data?.message ??
          error.message ??
          "Failed to save screening",
      );
    } finally {
      setSavingScreening(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <ClientList
        clients={clients}
        selectedClientId={selectedClient?.clientId ?? null}
        loading={loadingClients}
        onSelectClient={setSelectedClient}
      />

      <div className="space-y-5">
        <ClientDetailTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {activeTab === "screening" && (
          <div className="space-y-5">
            {!selectedClient ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <h3 className="font-semibold text-slate-900">Pilih client</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Pilih client terlebih dahulu untuk mengisi dan melihat data
                  screening.
                </p>
              </div>
            ) : (
              <>
                <ScreeningInputForm
                  selectedClientId={selectedClient.clientId}
                  loading={savingScreening}
                  onSubmitScreening={handleSubmitScreening}
                />

                {loadingScreeningHistory ? (
                  <div className="rounded-2xl bg-slate-100 p-5 text-sm text-slate-500">
                    Loading screening data...
                  </div>
                ) : screeningHistory ? (
                  <ClientScreeningCharts data={screeningHistory.chartData} />
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <h3 className="font-semibold text-slate-900">
                      Belum ada data screening
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Data screening client belum tersedia.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "menu" && (
          <div className="space-y-5">
            <MenuCalendar
              selectedClient={selectedClient}
              selectedDate={selectedDate}
              menuDates={menuDates}
              loadingMenuDates={loadingMenuDates}
              onDateChange={setSelectedDate}
            />

            <MenuByDateView
              selectedClient={selectedClient}
              selectedDate={selectedDate}
              menu={menu}
              loading={loadingMenu}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}
