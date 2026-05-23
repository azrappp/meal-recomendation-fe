type Client = {
  clientId: number;
  fullName: string;
  age: number;
  gender: string;
};

type ClientListProps = {
  clients: Client[];
  selectedClientId: number | null;
  loading: boolean;
  onSelectClient: (client: Client) => void;
};

export function ClientList({
  clients,
  selectedClientId,
  loading,
  onSelectClient,
}: ClientListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Daftar Klien</h2>
        <p className="mt-1 text-sm text-slate-500">
          Pilih klien untuk melihat menu berdasarkan tanggal.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl bg-slate-100 p-4 text-sm text-slate-500">
          Loading clients...
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-xl bg-slate-100 p-4 text-sm text-slate-500">
          Belum ada data klien.
        </div>
      ) : (
        <div className="space-y-2">
          {clients.map((client) => {
            const isActive = client.clientId === selectedClientId;

            return (
              <button
                key={client.clientId}
                type="button"
                onClick={() => onSelectClient(client)}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  isActive
                    ? "border-indigo-300 bg-indigo-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <p
                  className={`font-semibold ${
                    isActive ? "text-indigo-800" : "text-slate-900"
                  }`}
                >
                  {client.fullName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {client.age} tahun • {formatGender(client.gender)}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function formatGender(gender: string) {
  const normalized = gender.toLowerCase();

  if (normalized === "male" || normalized === "laki-laki") return "Laki-laki";
  if (normalized === "female" || normalized === "perempuan") return "Perempuan";

  return gender;
}
