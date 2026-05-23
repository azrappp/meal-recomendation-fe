type ActiveTab = "screening" | "menu";

type ClientDetailTabsProps = {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
};

export function ClientDetailTabs({
  activeTab,
  onChangeTab,
}: ClientDetailTabsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChangeTab("screening")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
            activeTab === "screening"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          Screening
        </button>

        <button
          type="button"
          onClick={() => onChangeTab("menu")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
            activeTab === "menu"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          Menu Makanan
        </button>
      </div>
    </div>
  );
}
