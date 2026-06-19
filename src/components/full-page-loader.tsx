import Loader2 from "lucide-react/dist/esm/icons/loader-2";

type FullPageLoaderType = {
  isLoading: boolean;
};

export function FullPageLoader({ isLoading }: FullPageLoaderType) {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 grid place-items-center bg-black/50"
    >
      <Loader2 className="size-10 animate-spin text-white" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
