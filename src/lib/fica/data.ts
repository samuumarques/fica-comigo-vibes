export type CategoryId = "musicas" | "filmes" | "livros" | "jogos" | "series";

export const CATEGORIES: { id: CategoryId; label: string; emoji: string; tint: string }[] = [
  { id: "musicas", label: "Músicas", emoji: "🎧", tint: "#FF3EA5" },
  { id: "filmes", label: "Filmes", emoji: "🎬", tint: "#C56BFF" },
  { id: "livros", label: "Livros", emoji: "📖", tint: "#8B7CFF" },
  { id: "jogos", label: "Jogos", emoji: "🎮", tint: "#5B6BFF" },
  { id: "series", label: "Séries", emoji: "📺", tint: "#FF7BD5" },
];

export const CATALOG: Record<CategoryId, string[]> = {
  musicas: [
    "Toxic — Britney Spears",
    "Since U Been Gone — Kelly Clarkson",
    "Mr. Brightside — The Killers",
    "Um Certo Alguém — Lulu Santos",
    "Espumas ao Vento — Fagner",
    "Crazy in Love — Beyoncé",
    "Hips Don't Lie — Shakira",
    "Vertigo — U2",
    "Vaca Profana — Caetano Veloso",
    "Chandelier — Sia",
    "Believe — Cher",
    "Anti-Hero — Taylor Swift",
    "Cruel Summer — Taylor Swift",
    "Baby One More Time — Britney Spears",
  ],
  filmes: [
    "Meninas Malvadas",
    "Simplesmente Acontece",
    "Kill Bill",
    "Cidade de Deus",
    "O Fabuloso Destino de Amélie Poulain",
    "De Repente 30",
    "Diário de uma Paixão",
    "Matrix",
    "Lilo & Stitch",
    "A Viagem de Chihiro",
    "Todo Mundo em Pânico",
    "Ela Dança, Eu Danço",
  ],
  livros: [
    "A Culpa é das Estrelas",
    "Harry Potter e o Prisioneiro de Azkaban",
    "O Pequeno Príncipe",
    "Cem Anos de Solidão",
    "Torto Arado",
    "Crepúsculo",
    "1984",
    "Duna",
    "A Hora da Estrela",
    "Percy Jackson",
    "O Conto da Aia",
    "Vidas Secas",
  ],
  jogos: [
    "The Sims 2",
    "Habbo Hotel",
    "Club Penguin",
    "Stardew Valley",
    "Minecraft",
    "Valorant",
    "Mario Kart",
    "Animal Crossing",
    "Guitar Hero",
    "Pou",
    "Tibia",
    "Overwatch",
  ],
  series: [
    "Gilmore Girls",
    "Todo Mundo Odeia o Chris",
    "Malhação",
    "Friends",
    "Euphoria",
    "Stranger Things",
    "Sex Education",
    "Rebelde",
    "Avatar: A Lenda de Aang",
    "Chaves",
    "Glee",
    "The Office",
  ],
};

export const MAX_PER_CATEGORY = 5;

// Filtro simples de palavras impróprias (pt-br), com normalização de acentos/leet.
const BAD_WORDS = [
  "puta",
  "puto",
  "vadia",
  "vagabunda",
  "piranha",
  "caralho",
  "porra",
  "buceta",
  "cu",
  "fdp",
  "merda",
  "viado",
  "bicha",
  "corno",
  "arrombado",
  "otario",
  "otaria",
  "idiota",
  "burra",
  "burro",
  "gostosa",
  "gostoso",
  "safada",
  "safado",
  "tesao",
  "nude",
  "nudes",
  "pau",
  "rola",
  "xota",
  "peituda",
  "transar",
  "foder",
  "fode",
  "foda",
  "estupro",
  "retardado",
  "mongoloide",
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[0@]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5\$/g, "s")
    .replace(/[^a-z\s]/g, " ");
}

export function findBadWords(text: string): string[] {
  const words = normalize(text).split(/\s+/).filter(Boolean);
  const hits = new Set<string>();
  for (const w of words) {
    for (const bad of BAD_WORDS) {
      if (w === bad || (bad.length > 4 && w.includes(bad))) hits.add(bad);
    }
  }
  return [...hits];
}

export function makeSlug(name: string) {
  const base =
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 18) || "alguem";
  const code = Math.random().toString(36).slice(2, 7);
  return `${base}-${code}`;
}
