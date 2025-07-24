const AnnouncementBar = () => {
  const message =
    "🎉  Welcome to Our Family — Grab your exclusive one-time reward now! ";
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-indigo-100 via-sky-100 to-blue-100 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] border-b border-indigo-200 dark:border-slate-700">
      <div className="marquee">
        <div className="marquee-group">
          <span>{message}</span>
          <span>{message}</span>
          <span>{message}</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
