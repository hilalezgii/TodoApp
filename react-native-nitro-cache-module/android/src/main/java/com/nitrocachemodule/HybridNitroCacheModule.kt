package com.nitrocachemodule

import com.margelo.nitro.nitrocachemodule.HybridNitroCacheModuleSpec

class HybridNitroCacheModule: HybridNitroCacheModuleSpec() {
  private val cache = mutableMapOf<String, Pair<String, Double>>()

  override fun setItem(key: String, value: String, ttl: Double) {
    val expireAt = System.currentTimeMillis() + ttl
    cache[key] = Pair(value, expireAt)
    println("Cache'e kaydedildi: $key")
  }

  override fun getItem(key: String): String? {
    val entry = cache[key] ?: run {
      println("Cache'de bulunamadı: $key")
      return null
    }

    val now = System.currentTimeMillis().toDouble()
    if (now > entry.second) {
      cache.remove(key) //
      println("Cache süresi doldu: $key")
      return null
    }

    println("Cache'den geldi: $key")
    return entry.first
  }

  override fun removeItem(key: String) {
    cache.remove(key)
    println("Cache'den silindi: $key")
  }

  override fun clear() {
    cache.clear()
    println("Cache temizlendi")
  }
}
