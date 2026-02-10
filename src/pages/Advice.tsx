import { useState, useEffect } from "react";
import { toast } from "sonner";


type TAdvice = { id: number; advice: string } | null;

const ADVICE_URL = "https://api.adviceslip.com/advice";

const Advice = () => {
  const [loading, setLoading] = useState(true);
  const [advice, setAdvice] = useState<TAdvice>(null);

  useEffect(() => {
    fetchAdviceFromAPI();
  }, []);
  // Fetch advice function handler
  const fetchAdviceFromAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(ADVICE_URL);
      // Check if request was successful

      if (!res.ok) {
        throw new Error("Unable To Fetch Advice From Server.");
      }

      // Acess data from response object
      const data = await res.json();
      setAdvice(data.slip);
      
      // Show toast for api request success
      toast.success("Request Success", {
        description: "Requested quote has been retrieved 😀"
      });

    } catch (error) {
      setAdvice(null);
      //@ts-ignore
      toast.error(error.message || "Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center bg-primary-950 h-screen p-4 sm:p-0">
      <section
        className={`flex flex-col items-center bg- bg-primary-900 text-center p-6 sm:p-15 pt-10 pb-0  max-w-xl gap-4 rounded-2xl shadow-2xl hover:shadow-secondary-300 transition duration-700 ease-in cursor-default sm:min-w-90 min-h-50 ${loading && "animate-bounce"}`}
      >
        {!loading && <p className="text-secondary-300">ADVICE #{advice?.id}</p>}
        <h1 className="text-xl sm:text-3xl font-bold text-white">
          {loading && "Loading..."}
          {!loading && advice && advice.advice}
          {!loading && !advice && "Unable to fetch advice from server."}
          {/* "It is easy to sit up and take notice, what's difficult is sitting up
          and taking action." */}
        </h1>
        {!loading && (
          <>
            <img src="/images/pattern-divider-desktop.svg" alt="" />
            <button
              className="w-15 h-15 rounded-full bg-secondary-300 p-3 items-center flex justify-center translate-y-8"
              onClick={fetchAdviceFromAPI}
            >
              <img src="/images/icon-dice.svg" alt="" />
            </button>
          </>
        )}
      </section>
    </main>
  );
};

export default Advice;
