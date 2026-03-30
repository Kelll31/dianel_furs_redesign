import { Helmet } from "react-helmet-async";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Catalog from "./Catalog";
import Lookbook from "./Lookbook";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import CollectionShowcase from "./CollectionShowcase";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Dianel Furs | Эксклюзивные изделия из натурального меха</title>
        <meta name="description" content="Dianel Furs - премиальные изделия из меха норки, соболя, лисы и эко-меха. Индивидуальный пошив, высочайшее качество и эксклюзивный дизайн в Пятигорске." />
        <meta name="keywords" content="меха, шубы, норка, соболь, Пятигорск, Dianel Furs, эксклюзивные меха, пошив шуб" />
      </Helmet>
      <Hero />
      <Marquee text="Premium Quality • Новая Коллекция • Эксклюзивные Меха • Индивидуальный Подход" />
      <CollectionShowcase />
      <Catalog />
      <Lookbook />
      <About />
      <Marquee text="Saga Furs • Kopenhagen Fur • American Legend • Blackglama" />
      <Contact />
      <Footer />
    </>
  );
}
