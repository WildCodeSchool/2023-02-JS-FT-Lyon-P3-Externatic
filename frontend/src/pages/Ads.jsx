import Navbar from "../components/Navbar";
import SearchBar from "../components/Ads/SearchBar";
import AdsList from "../components/Ads/AdsList";

export default function Ads() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <AdsList />
    </div>
  );
}
