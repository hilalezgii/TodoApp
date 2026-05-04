import Foundation
import NitroModules

class HybridNitroCacheModule: HybridNitroCacheModuleSpec {

  static let shared = HybridNitroCacheModule()

  private var cache: [String: (value: String, expireAt: Double)] = [:]

  func setItem(key: String, value: String, ttl: Double) throws -> Void {
    let expireAt = Date().timeIntervalSince1970 * 1000 + ttl
    HybridNitroCacheModule.shared.cache[key] = (value: value, expireAt: expireAt)
    print("Cache'e kaydedildi: \(key), boyut: \(HybridNitroCacheModule.shared.cache.count)")
  }

  func getItem(key: String) throws -> Variant_NullType_String {
    print("🔍 Aranan: \(key), boyut: \(HybridNitroCacheModule.shared.cache.count)")
    guard let entry = HybridNitroCacheModule.shared.cache[key] else {
      print("Bulunamadı: \(key)")
      return .first(NullType.null)
    }

    let now = Date().timeIntervalSince1970 * 1000
    if now > entry.expireAt {
      HybridNitroCacheModule.shared.cache.removeValue(forKey: key)
      print("Süresi doldu: \(key)")
      return .first(NullType.null)
    }

    print("Cache'den geldi: \(key)")
    return .second(entry.value)
  }

  func removeItem(key: String) throws -> Void {
    HybridNitroCacheModule.shared.cache.removeValue(forKey: key)
    print("Silindi: \(key)")
  }

  func clear() throws -> Void {
    HybridNitroCacheModule.shared.cache.removeAll()
    print("Temizlendi!")
  }
}
