import { NitroCacheModule } from "react-native-nitro-cache-module";

const CACHE_KEY = "todos:all";
const TTL = 10 * 1000;

export function todoCache(todos: any[]) {
  NitroCacheModule.setItem(CACHE_KEY, JSON.stringify(todos), TTL);
  const verify = NitroCacheModule.getItem(CACHE_KEY);
  console.log("Set sonrası anında verify:", verify);
  console.log("Cache'e kaydedildi!");
  console.log("caache key todo", CACHE_KEY);
}

export function getCachedTodos(): any[] | null {
  const cached = NitroCacheModule.getItem(CACHE_KEY);
  console.log("cache key get", CACHE_KEY);
  console.log("Cache getItem sonucu:", cached, typeof cached);
  if (!cached) return null;
  console.log("Cache'den geldi!");
  return JSON.parse(cached as string);
}
export function removeCache() {
  NitroCacheModule.removeItem(CACHE_KEY);
  console.log("Cache temizlendi!");
}
