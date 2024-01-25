import HomeCards from "../Components/HomeCards";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
/* import Footer from "../Components/Footer";*/

export default function Home() {
  return (
    <>
      <Navbar />
      <Search />
      <HomeCards />
      {/* <Footer /> */}
    </>
  );
}
