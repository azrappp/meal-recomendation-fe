type Client = {
  clientId: number;
  fullName: string;
  age: number;
  gender: string;
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

type MenuByDateViewProps = {
  selectedClient: Client | null;
  selectedDate: string;
  menu: MenuByDateResponse | null;
  loading: boolean;
};

export function MenuByDateView({
  selectedClient,
  selectedDate,
  menu,
  loading,
}: MenuByDateViewProps) {
  if (!selectedClient) {
    return (
      <EmptyState
        title="Pilih klien"
        description="Silakan pilih klien terlebih dahulu untuk melihat menu berdasarkan tanggal."
      />
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
        Loading menu...
      </div>
    );
  }

  if (!menu) {
    return (
      <EmptyState
        title="Menu tidak ditemukan"
        description={`Belum ada menu untuk ${selectedClient.fullName} pada tanggal ${formatDateLong(
          selectedDate,
        )}.`}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Menu Hari {menu.day.dayNumber}
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {formatDateLong(menu.day.menuDate)}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {menu.client.fullName} • Diet: {menu.dietType}
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50 px-4 py-3 text-right">
          <p className="text-xs text-indigo-500">Total Energi</p>
          <p className="text-lg font-bold text-indigo-700">
            {formatNumber(menu.day.summary.energyKcal)} kkal
          </p>
        </div>
      </div>

      <NutritionSummary summary={menu.day.summary} />

      <div className="mt-5 space-y-3">
        {menu.day.meals.map((meal) => (
          <div key={meal.mealTime} className="rounded-xl bg-slate-50 p-4">
            <h3 className="mb-3 font-semibold text-slate-900">
              {formatMealTime(meal.mealTime)}
            </h3>

            <div className="space-y-2">
              {meal.items.map((item) => (
                <div
                  key={item.menuItemId}
                  className="flex items-start justify-between gap-3 rounded-xl bg-white p-3"
                >
                  <div>
                    <p
                      className={`font-medium ${
                        item.isEaten
                          ? "text-slate-400 line-through"
                          : "text-slate-800"
                      }`}
                    >
                      {item.foodName}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.categoryCode}
                    </p>

                    {item.isEaten && (
                      <p className="mt-1 text-xs font-medium text-green-600">
                        Sudah dimakan
                      </p>
                    )}
                  </div>

                  <div className="text-right text-xs text-slate-600">
                    <p>{item.urt ?? "-"}</p>
                    <p>{item.gram ? `${formatNumber(item.gram)} g` : "-"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NutritionSummary({
  summary,
}: {
  summary: MenuByDateResponse["day"]["summary"];
}) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
      <NutritionBox label="Protein" value={summary.proteinG} unit="g" />
      <NutritionBox label="Lemak" value={summary.fatG} unit="g" />
      <NutritionBox label="Karbo" value={summary.carbG} unit="g" />
      <NutritionBox label="Natrium" value={summary.sodiumMg} unit="mg" />
      <NutritionBox label="Serat" value={summary.fiberG} unit="g" />
    </div>
  );
}

function NutritionBox({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="rounded-xl bg-slate-100 p-3 text-center">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-slate-900">
        {formatNumber(value)} {unit}
      </p>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function formatMealTime(mealTime: string) {
  const labels: Record<string, string> = {
    breakfast: "Sarapan",
    morning_snack: "Snack Pagi",
    lunch: "Makan Siang",
    afternoon_snack: "Snack Sore",
    dinner: "Makan Malam",
  };

  return labels[mealTime] ?? mealTime;
}

function formatDateLong(date: string) {
  const parsedDate = new Date(date);

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

function formatNumber(value?: number | null) {
  if (value === undefined || value === null) return "-";

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 1,
  }).format(value);
}
