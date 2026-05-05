cat > /Users/ademalkan/Desktop/TodoApp/node_modules/react-native-nitro-cache-module/android/src/main/java/com/nitrocachemodule/HybridNitroCacheModule.kt << 'EOF'
package com.nitrocachemodule

import android.content.Context
import com.margelo.nitro.NitroModules
import com.margelo.nitro.core.NullType
import com.margelo.nitro.nitrocachemodule.HybridNitroCacheModuleSpec
import com.margelo.nitro.nitrocachemodule.Variant_NullType_String
import org.json.JSONObject
import java.io.File

class HybridNitroCacheModule : HybridNitroCacheModuleSpec() {

  private val cache = mutableMapOf<String, Pair<String, Double?>>()

  private val storageFile: File by lazy {
    File(NitroModules.applicationContext!!.filesDir, "nitro_cache.json")
  }

  init {
    loadAllFromDisk()
  }

  private fun loadAllFromDisk() {
    try {
      if (!storageFile.exists()) return
      val json = JSONObject(storageFile.readText())
      val now = System.currentTimeMillis().toDouble()
      for (key in json.keys()) {
        val entry = json.getJSONObject(key)
        val value = entry.getString("value")
        val expireAt = if (entry.has("expireAt")) entry.getDouble("expireAt") else null
        if (expireAt != null && now > expireAt) continue
        cache[key] = Pair(value, expireAt)
      }
      println("Diskten yüklendi: ${cache.size} kayıt")
    } catch (e: Exception) {
      println("loadAllFromDisk hatası: $e")
    }
  }

  private fun saveToDisk() {
    try {
      val json = JSONObject()
      for ((key, pair) in cache) {
        val entry = JSONObject()
        entry.put("value", pair.first)
        if (pair.second != null) entry.put("expireAt", pair.second)
        json.put(key, entry)
      }
      storageFile.writeText(json.toString())
    } catch (e: Exception) {
      println("saveToDisk hatası: $e")
    }
  }

  override fun setItem(key: String, value: String, ttl: Double?) {
    val expireAt = if (ttl != null && ttl > 0) System.currentTimeMillis() + ttl else null
    cache[key] = Pair(value, expireAt)
    saveToDisk()
    println("Kaydedildi: $key")
  }

  override fun getItem(key: String): Variant_NullType_String {
    val entry = cache[key] ?: return Variant_NullType_String.First(NullType.NULL)
    val expireAt = entry.second
    if (expireAt != null && System.currentTimeMillis() > expireAt) {
      cache.remove(key)
      saveToDisk()
      return Variant_NullType_String.First(NullType.NULL)
    }
    return Variant_NullType_String.Second(entry.first)
  }

  override fun removeItem(key: String) {
    cache.remove(key)
    saveToDisk()
    println("Silindi: $key")
  }

  override fun clear() {
    cache.clear()
    saveToDisk()
    println("Temizlendi!")
  }
}
EOF
