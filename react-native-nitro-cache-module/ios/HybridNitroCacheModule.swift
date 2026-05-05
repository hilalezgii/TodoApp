import Foundation
import NitroModules

struct CacheEntry: Codable {
  let value: String
  let expireAt: Double?
}

class HybridNitroCacheModule: HybridNitroCacheModuleSpec {

  static let shared = HybridNitroCacheModule()
  private var cache: [String: CacheEntry] = [:]

  private var storageURL: URL {
    let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    return docs.appendingPathComponent("nitro_cache.json")
  }

  override init() {
    super.init()
    loadAllFromDisk()
  }

  private func loadAllFromDisk() {
    guard let data = try? Data(contentsOf: storageURL) else { return }
    guard let dict = try? JSONDecoder().decode([String: CacheEntry].self, from: data) else { return }
    let now = Date().timeIntervalSince1970 * 1000
    for (key, entry) in dict {
      if let expireAt = entry.expireAt, now > expireAt { continue }
      cache[key] = entry
    }
    print("Diskten yüklendi: \(cache.count) kayıt")
  }

  private func saveToDisk() {
    guard let data = try? JSONEncoder().encode(cache) else { return }
    try? data.write(to: storageURL, options: .atomic)
  }

  func setItem(key: String, value: String, ttl: Double) throws -> Void {
    let expireAt: Double? = ttl > 0 ? Date().timeIntervalSince1970 * 1000 + ttl : nil
    cache[key] = CacheEntry(value: value, expireAt: expireAt)
    saveToDisk()
    print("Kaydedildi: \(key)")
  }

  func getItem(key: String) throws -> Variant_NullType_String {
    guard let entry = cache[key] else {
      return .first(NullType.null)
    }
    if let expireAt = entry.expireAt {
      let now = Date().timeIntervalSince1970 * 1000
      if now > expireAt {
        cache.removeValue(forKey: key)
        saveToDisk()
        return .first(NullType.null)
      }
    }
    return .second(entry.value)
  }

  func removeItem(key: String) throws -> Void {
    cache.removeValue(forKey: key)
    saveToDisk()
    print("Silindi: \(key)")
  }

  func clear() throws -> Void {
    cache.removeAll()
    saveToDisk()
    print("Temizlendi!")
  }
}
