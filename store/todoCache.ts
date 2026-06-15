import { NitroCacheModule } from "react-native-nitro-cache-module";

const CACHE_KEY = "todos:all";

export function todoCache(todos: any[]) {
  NitroCacheModule.setItem(CACHE_KEY, JSON.stringify(todos), 0);
  console.log("Cache'e kaydedildi!");
}

export function getCachedTodos(): any[] | null {
  const cached = NitroCacheModule.getItem(CACHE_KEY);
  console.log("getCachedTodos sonucu:", cached, typeof cached);

  if (!cached) return null;
  return JSON.parse(cached as string);
}

export function removeCache() {
  NitroCacheModule.removeItem(CACHE_KEY);
}
