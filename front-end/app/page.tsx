import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="page-title text-3xl sm:text-4xl">
        <span className="title">Vaccine Eligibility</span>
      </h1>
       <main className="floating-card">
          <h1 className="text-3xl font-bold text-black">Login</h1>
        <div className="w-full flex flex-col gap-4 mt-8">
          <input placeholder="Username" className="bg-white text-black"/>
          <input
            placeholder="Password"
            className="bg-white text-black"
            type="password"
          />
          <div className="w-full flex justify-center">
            <a
              type="button"
              href="/questions"
              className="bubble-button"
            >
              Login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
