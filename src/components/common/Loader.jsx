export default function Loader() {
  return (
    <div className="min-h-50 flex items-center justify-center">
      <div className="relative w-10 h-10">
        <div
          className="absolute inset-0 rounded-full animate-spin shadow-lg"
          style={{
            border: "4px solid rgba(45,27,105,0.3)",
            borderTopColor: "#2d1b69",
          }}
        />

        <div className="absolute inset-2 rounded-full" />
      </div>
    </div>
  );
}
