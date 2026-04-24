import Consultation from "../components/Consultation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Process from "../components/Process";
import ProjectGallery from "../components/ProjectGallery";
import Proof from "../components/Proof";
import Services from "../components/Services";

export default function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectGallery />
        <Services />
        <Process />
        <Proof />
        <Consultation />
      </main>
      <Footer />
    </>
  );
}
