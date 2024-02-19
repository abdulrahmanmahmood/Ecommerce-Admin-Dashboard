"use client";

import LoginPage from "./_components/login";


export default function Home() {
  return (
    <main className=" min-h-screen items-center ">
      <h2>Welcome to the Admin panel</h2>

      <LoginPage />
    </main>
  );
}
