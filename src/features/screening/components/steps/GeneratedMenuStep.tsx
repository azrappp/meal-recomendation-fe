type GeneratedMenuStepProps = {
  generatedMenu: WeeklyMenu | null;
};

type WeeklyMenu = {
  menuRecommendationId: number;
  screeningId: number;
  dietType: string;
  targetEnergyKcal: number;
  totalDays: number;
  generatedAt: string | Date;
  days?: WeeklyMenuDay[];
};

type WeeklyMenuDay = {
  dayNumber: number;
  menuDate?: string | Date;
  summary: {
    energyKcal: number;
    proteinG: number;
    fatG: number;
    carbG: number;
  };
  meals?: WeeklyMeal[];
};

type WeeklyMeal = {
  mealTime: string;
  items?: WeeklyMealItem[];
};

type WeeklyMealItem = {
  menuItemId: number;
  foodName: string;
  categoryCode: string;
  portion: number;
  urt: string | null;
  gram: number | null;
  isEaten?: boolean;
  eatenAt?: string | Date | null;
  userNote?: string | null;
};
export function GeneratedMenuStep({ generatedMenu }: GeneratedMenuStepProps) {
  if (!generatedMenu) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Rekomendasi Menu
        </h2>

        <div className="rounded-2xl bg-slate-100 p-5 text-sm text-slate-600">
          Menu belum tersedia.
        </div>
      </div>
    );
  }

  const days = generatedMenu.days ?? [];

  return (
    <div className="space-y-5">
      <Header generatedMenu={generatedMenu} />

      {days.length === 0 ? (
        <div className="rounded-2xl bg-slate-100 p-5 text-sm text-slate-600">
          Data menu harian belum tersedia.
        </div>
      ) : (
        <div className="space-y-4">
          {days.map((day) => (
            <MenuDayCard key={day.dayNumber} day={day} />
          ))}
        </div>
      )}
    </div>
  );
}

function Header({ generatedMenu }: { generatedMenu: WeeklyMenu }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        Rekomendasi Menu Mingguan
      </h2>

      <div className="mt-1 space-y-1 text-sm text-slate-500">
        <p>
          Target energi: {formatNumber(generatedMenu.targetEnergyKcal)} kkal
        </p>
        <p>Total hari: {generatedMenu.totalDays} hari</p>
      </div>
    </div>
  );
}

function MenuDayCard({ day }: { day: WeeklyMenuDay }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Hari {day.dayNumber}
          </p>

          <h3 className="mt-1 font-bold text-slate-900">
            {formatMenuDate(day.menuDate)}
          </h3>

          <p className="mt-1 text-sm text-slate-500">Total energi harian</p>
        </div>

        <div className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
          {formatNumber(day.summary.energyKcal)} kkal
        </div>
      </div>

      <NutritionSummary summary={day.summary} />

      <div className="mt-4 space-y-3">
        {day.meals?.map((meal) => (
          <MealCard key={meal.mealTime} meal={meal} />
        ))}
      </div>
    </div>
  );
}

function NutritionSummary({ summary }: { summary: WeeklyMenuDay["summary"] }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-center text-xs">
      <NutritionBox label="Protein" value={summary.proteinG} unit="g" />
      <NutritionBox label="Lemak" value={summary.fatG} unit="g" />
      <NutritionBox label="Karbo" value={summary.carbG} unit="g" />
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
    <div className="rounded-xl bg-slate-100 p-2">
      <p className="text-slate-500">{label}</p>
      <p className="font-bold text-slate-900">
        {formatNumber(value)} {unit}
      </p>
    </div>
  );
}

function MealCard({ meal }: { meal: WeeklyMeal }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="mb-2 text-sm font-semibold text-slate-800">
        {formatMealTime(meal.mealTime)}
      </p>

      <div className="space-y-2">
        {meal.items?.map((item, index) => (
          <MealItemRow
            key={`${meal.mealTime}-${item.foodName}-${index}`}
            item={item}
            onToggleEaten={handleToggleEaten}
          />
        ))}
      </div>
    </div>
  );
}
function MealItemRow({
  item,
  onToggleEaten,
}: {
  item: WeeklyMealItem;
  onToggleEaten?: (menuItemId: number, isEaten: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg bg-white p-2 text-sm">
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={item.isEaten ?? false}
          onChange={(event) =>
            onToggleEaten?.(item.menuItemId, event.target.checked)
          }
          className="mt-1 h-4 w-4 rounded border-slate-300"
        />

        <div>
          <p
            className={`font-medium ${
              item.isEaten ? "text-slate-400 line-through" : "text-slate-800"
            }`}
          >
            {item.foodName}
          </p>

          <p className="text-xs text-slate-500">{item.categoryCode}</p>

          {item.isEaten && (
            <p className="mt-1 text-xs font-medium text-green-600">
              Sudah dimakan
            </p>
          )}
        </div>
      </div>

      <div className="text-right text-xs text-slate-600">
        <p>{item.urt ?? "-"}</p>
        <p>{item.gram ? `${formatNumber(item.gram)} g` : "-"}</p>
      </div>
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

function formatMenuDate(date?: string | Date) {
  if (!date) return "Tanggal belum tersedia";

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

async function handleToggleEaten(menuItemId: number, isEaten: boolean) {
  const response = await fetch(`/api/meal/items/${menuItemId}/eaten`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isEaten,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to update eaten status");
  }

  return result.data;
}
