import { Htag } from "@/components/Htag";
import { Login } from "@/components/Login/Login";



export default function Home() {

  return (
    <div>
      <Login/>
      <Htag tag="h1">ЗАГОЛОВОК</Htag>
      <Htag tag="h2">СРЕДНИЙ ЗАГОЛОВОК</Htag>
      <Htag tag="h3">ОБЫЧНЫЙ ТЕКСТ</Htag>
    </div>
  );
}
