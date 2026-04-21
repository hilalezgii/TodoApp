# TodoApp - Görev Yönetim Uygulaması

Bu proje, React Native ve Expo kullanılarak geliştirilmiş, görevlerin aşamalı olarak takip edilmesini sağlayan bir mobil uygulamadır. Uygulama içerisinde performans optimizasyonları, modüler bileşen yapısı ve modern UI standartları uygulanmıştır.

## Proje Amacı ve Kapsamı

Uygulama, görevlerin sadece "yapıldı/yapılmadı" şeklinde değil, bir iş akışı içerisinde yönetilmesini sağlar. Görevler şu üç aşamadan geçer:

1. **Todo's:** Henüz başlanmamış görevler.
2. **In Progress:** Üzerinde çalışılan aktif görevler.
3. **Done:** Başarıyla tamamlanmış görevler.

## Teknik Özellikler

### 1. Modüler Bileşen Mimarisi

Kodun sürdürülebilirliği için bileşenler mantıksal parçalara ayrılmıştır:

- **Header:** Kalan iş sayısını `useMemo` ile hesaplanan dinamik bir sayaçla gösterir.
- **CreateTodo:** Yeni görev girişi ve state kontrolünü sağlar.
- **TodoList:** Görevlerin kategorilere ayrılmasını ve performanslı listelenmesini yönetir. Kod tekrarını önlemek için kategori bazlı listeleme yapısı (`ListCategory`) tekilleştirilmiştir.

### 2. Performans ve Optimizasyon

Uygulamanın akıcı çalışması için şu ileri düzey React teknikleri uygulanmıştır:

- **FlatList Sanallaştırma:** Liste yönetimi için `FlatList` kullanılarak sadece ekranda görünen elemanların render edilmesi sağlanmış, bellek kullanımı optimize edilmiştir.
- **useCallback & useMemo:** `renderItem` fonksiyonu `useCallback` ile sarmalanarak gereksiz referans değişimleri ve FlatList'in gereksiz re-render olması engellenmiştir.
  - Veri filtreleme ve sayaç işlemleri `useMemo` ile sadece bağımlı oldukları veriler değiştiğinde çalışacak şekilde optimize edilmiştir.
- **DRY :** Benzer liste yapıları tek bir fonksiyonel şablona indirilerek kod kalabalığı azaltılmış ve bakım kolaylığı sağlanmıştır.

### 3. State Yönetimi

Veri akışı "Single Source of Truth" prensibiyle `app/index.tsx` seviyesinde merkezi olarak yönetilmektedir. Alt bileşenler, ihtiyaç duydukları veriyi prop olarak alır ve kullanıcı etkileşimlerini callback fonksiyonları aracılığıyla yukarıya iletir.

### 4. UI ve Tasarım

- **Gluestack UI v2:** Modern ve esnek bileşen kütüphanesi kullanılmıştır.
- **NativeWind:** Stil yönetimi Tailwind CSS standartlarında yapılmıştır.
- **Koyu Tema:** Modern uygulama standartlarına uygun, Slate-900 ağırlıklı bir tema tercih edilmiştir.

## Kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Uygulamayı başlatın:

```bash
 npx expo start
```
