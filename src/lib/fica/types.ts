import type { CategoryId } from "./data";

export type Draft = {
  to: string;
  from: string;
  message: string;
  audioUrl: string | null;
  picks: Record<CategoryId, string[]>;
};

export const emptyDraft: Draft = {
  to: "",
  from: "",
  message: "",
  audioUrl: null,
  picks: { musicas: [], filmes: [], livros: [], jogos: [], series: [] },
};

export type Answer = "fica" | "rala" | "ignora";
