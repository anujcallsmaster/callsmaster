import { getDictionary } from "@/get-dictionary";
import Navbar from "../ui/navbar";

export default async function IndexPage(props) {

  const { lang } = await props.params;
  
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Navbar/>
      <div>
        <p>Current locale: {lang}</p>
        <p>
          This text is rendered on the server:{" "}
          {dictionary["server-component"].welcome}
        </p>
      </div>
    </div>
  );
}