import { Star } from "lucide-react";
import pokeball from "../assets/pokeball.png";

function App() {
  const types = [
    { type: "All types", color: "#000000" },
    { type: "Normal", color: "#AAAA99" },
    { type: "Fire", color: "#FF4422" },
    { type: "Water", color: "#3399ff" },
    { type: "Eletric", color: "#FFCC33" },
    { type: "Grass", color: "#77CC55" },
    { type: "Ice", color: "#66CCFF" },
    { type: "Fighting", color: "#B95443" },
    { type: "Poison", color: "#AA5599" },
    { type: "Ground", color: "#DDBB55" },
    { type: "Flying", color: "#8899FF" },
    { type: "Psychic", color: "#FF5599" },
    { type: "Bug", color: "#AABB22" },
    { type: "Rock", color: "#BBAA66" },
    { type: "Ghost", color: "#6666BB" },
    { type: "Dragon", color: "#7766EE" },
    { type: "Dark", color: "#775544" },
    { type: "Steel", color: "#AAAABB" },
    { type: "Fairy", color: "#EE99EE" },
  ];
  return (
    <div className="flex flex-col w-screen h-screen items-center">
      <header className="bg-linear-to-br from-ice to-dragon w-[65%] p-4 ">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              src={pokeball}
              alt="pokeball image"
              className="w-[3em] h-[3em]"
            />
            <h1>Your Online pokedex</h1>
          </div>
          <button className="bg-ice flex items-center self-start p-1 rounded-md">
            <Star className="w-[1em]" /> <p className="text-xs">Favorites</p>
          </button>
        </div>
        <p>
          Explore and discover all generation's pokemons and it's
          atributes
        </p>
      </header>
      <main className="w-[65%] px-2 py-2">
        <h2 className="text-black py-2 text-[1.3em]">Discovered Pokemons</h2>
        <ul className="flex flex-wrap gap-2">
          {types.map((types) => (
            <li key={types.type}>
              <button
                style={{
                  borderColor: types.color,
                  borderWidth: 2,
                  color: types.color,
                }}
                className="rounded-md py-1 px-2 text-sm"
              >
                {types.type}
              </button>
            </li>
          ))}
        </ul>
        
      </main>
    </div>
  );
}

export default App;
