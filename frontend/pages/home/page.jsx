import { useEffect, useState } from "react";
import { AboutHP, Info, IntroOverlay, Projects, SkillsHP } from "../../components/export";

function Page() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedHome");

    if (!hasVisited) {
      setShowOverlay(true);
      sessionStorage.setItem("hasVisitedHome", "true");
    }
  }, []);

  return (
    <>
      {showOverlay && <IntroOverlay />}
      <div>
        <header className="flex justify-center items-center h-screen w-full">
          <Info />
        </header>
        <section>
          <AboutHP />
        </section>
        <section>
          <SkillsHP />
        </section>
        <section>
          <Projects />
        </section>
      </div>
    </>
  );
}

export default Page;
