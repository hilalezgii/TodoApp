import type { HybridObject } from 'react-native-nitro-modules'

export interface NitroCacheModule extends HybridObject<{
  ios: 'swift'
  android: 'kotlin'
}> {
  setItem(key: string, value: string, ttl: number): void
  getItem(key: string): string | null
  removeItem(key: string): void
  clear(): void
}
