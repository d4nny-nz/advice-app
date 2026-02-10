import Advice from "./pages/Advice"
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Advice />
      <Toaster richColors position="top-right"/>

    </>
  );
}

export default App