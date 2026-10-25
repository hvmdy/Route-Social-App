import { Outlet } from "react-router";
import AuthIntro from "../components/AuthIntro/AuthIntro";

export default function Authlatout() {
  return (
    <>
      <main className="bg-sec min-h-screen px-4 py-12 sm:py-12 lg:flex lg:items-center">
        <div className="container mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="order-2 w-full max-w-xl text-center lg:order-1 lg:text-left">
            <AuthIntro />
          </div>
          <div className="order-1 w-full max-w-[430px] lg:order-2">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
