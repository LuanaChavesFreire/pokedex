import { Star } from "lucide-react";
import pokeball from "../assets/pokeball.png";
import { useState, useEffect } from "react";

function App() {
  const types = [
    { type: "All types", color: "#000000" },
    { type: "Normal", color: "#AAAA99" },
    { type: "Fire", color: "#FF4422" },
    { type: "Water", color: "#3399ff" },
    { type: "Electric", color: "#FFCC33" },
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
  const [pokemon, setPokemon] = useState([]);
  const [limit] = useState(48);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getTypeColor = (typeName) => {
    const typeObj = types.find(
      (t) => t.type.toLowerCase() === typeName.toLowerCase()
    );
    return typeObj ? typeObj.color : "#CCCCCC";
  };

  useEffect(() => {
    async function fetchPokemon() {
      if (loading || !hasMore) return;

      setLoading(true);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      // pokemon full data setch
      const detailPokemon = await Promise.all(
        data.results.map(async (poke) => {
          const res = await fetch(poke.url);
          return await res.json();
        })
      );

      setPokemon((prev) => [...prev, ...detailPokemon]);

      //verify if there're more pokemons to load
      if (data.next === null) {
        setHasMore(false);
      } else {
        setOffset((prev) => prev + limit);
      }
      setLoading(false);
      console.log(pokemon);
    }
    fetchPokemon();
  }, [offset]);

  return (
    <div className="flex flex-col  w-full max-w-307.5 h-full justify-start items-center bg-[#fcfcfc]">
      <header className="w-full bg-linear-to-br from-ice to-dragon p-4 ">
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
        <p>Explore and discover all generation's pokemons and it's atributes</p>
      </header>
      <main className="w-full px-2 py-2 gap-4 flex flex-col text-black">
        <nav>
          <h2 className="py-2 text-[1.3em]">Discovered Pokemons</h2>
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
          <p className="font-bold">Displayed pokemons: <span className="font-normal">{pokemon.length}</span></p>
        </nav>

        <ul className="flex flex-wrap gap-6 justify-around">
          {pokemon.map((poke) => (
            <div
              key={poke.id}
              className="w-[18%] px-3 py-2 text-black bg-c2 rounded-4xl border-c1 border-8 text-center"
            >
              <div className="flex justify-between">
                <section>
                  <span>#{poke.id}</span>
                </section>

                <section>
                  <span
                    style={{
                      backgroundColor: getTypeColor(poke.types[0].type.name),
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    {poke.types[0].type.name}
                  </span>
                  {poke.types.slice(1).map((type, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: getTypeColor(type.type.name),
                        color: "#fff",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        display: "inline-block",
                        marginLeft: "4px",
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </section>
              </div>
              <img
                src={poke.sprites.other["official-artwork"].front_default}
                className="w-37.5 m-auto"
              />
              <p className="font-medium">{poke.name}</p>
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
