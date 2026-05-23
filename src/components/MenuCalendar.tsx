import { DayPicker } from "react-day-picker";
import { id } from "date-fns/locale";
import "react-day-picker/dist/style.css";

type Client = {
  clientId: number;
  fullName: string;
  age: number;
  gender: string;
};

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

type MenuCalendarProps = {
  selectedClient: Client | null;
  selectedDate: string;
  menuDates: ClientMenuDate[];
  loadingMenuDates: boolean;
  onDateChange: (date: string) => void;
};

export function MenuCalendar({
  selectedClient,
  selectedDate,
  menuDates,
  loadingMenuDates,
  onDateChange,
}: MenuCalendarProps) {
  const selected = parseDateOnly(selectedDate);

  const datesWithMenu = menuDates.map((item) => parseDateOnly(item.menuDate));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Kalender Menu
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {selectedClient
              ? `Menu untuk ${selectedClient.fullName}`
              : "Pilih klien terlebih dahulu."}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {formatDateLong(selectedDate)}
        </div>
      </div>

      {loadingMenuDates && (
        <div className="mb-3 rounded-xl bg-slate-100 p-3 text-sm text-slate-500">
          Loading tanggal menu...
        </div>
      )}

      <div className={!selectedClient ? "pointer-events-none opacity-50" : ""}>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (!date) return;
            onDateChange(formatDateInput(date));
          }}
          locale={id}
          modifiers={{
            hasMenu: datesWithMenu,
          }}
          modifiersClassNames={{
            selected: "calendar-selected-day",
            hasMenu: "calendar-has-menu",
            today: "calendar-today",
          }}
          className="clean-calendar"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-indigo-600" />
          <span>Tanggal dipilih</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span>Ada menu</span>
        </div>
      </div>
    </div>
  );
}

function parseDateOnly(date: string) {
  const normalizedDate = date.includes("T") ? date.split("T")[0] : date;
  const [year, month, day] = normalizedDate.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateLong(date: string) {
  const parsedDate = parseDateOnly(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Tanggal tidak valid";
  }

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}
