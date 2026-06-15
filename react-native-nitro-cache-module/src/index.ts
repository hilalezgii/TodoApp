import { NitroModules } from 'react-native-nitro-modules'
import type { NitroCacheModule as NitroCacheModuleSpec } from './specs/nitro-cache-module.nitro'

let _instance: NitroCacheModuleSpec | null = null

export const NitroCacheModule = (() => {
  if (!_instance) {
    _instance =
      NitroModules.createHybridObject<NitroCacheModuleSpec>('NitroCacheModule')
  }
  return _instance
})()
