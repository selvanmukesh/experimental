"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Current Date & Time:</h2>
      <p>{dateTime.toLocaleString()}</p>
    </div>
  );
}
