import { useEffect, useState } from "react";

export default function DateTimeStamp() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    const weekday = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "p" : "a";
    hours = hours % 12 || 12;

    return `[${month}/${day}/${year} ${weekday} ${hours}:${minutes} ${period}]`;
  };

  return <span className="text-xs text-gray-500">{formatDate(now)}</span>;
}
