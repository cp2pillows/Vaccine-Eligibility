import Image from "next/image";

export default function Question() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="page-title text-3xl sm:text-4xl">
        <span className="title">Patient Profile</span>
      </h1>
      <Image src="/doctor-clipart.png" alt="Doctor" width={700} height={700} className="absolute bottom-0 left-0" />
      <div className="form-card relative">
        <h1 className="text-3xl font-bold text-black absolute top-0 left-0 pl-6 pt-4">Question 1</h1>
        <p className="mt-4 text-lg text-black">How are you?</p>
        <button className="bubble-button mt-6">Yes</button>
        <button className="bubble-button mt-6">No</button>
        <button className="bubble-button mt-6">Not sure</button>
      </div>
    </div>
  );
}
