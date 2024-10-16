"use client";

import { exportPayments } from "./actions";

export default function Home() {
  const handleClick = async () => {
    const result = await exportPayments();

    console.log({ result });
  };

  return <button onClick={handleClick}>Export payments</button>;
}
