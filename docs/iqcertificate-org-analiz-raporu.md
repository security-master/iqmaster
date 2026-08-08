# IQCertificate.org — Kapsamlı Site Analiz Raporu

**Tarih:** 8 Ağustos 2026  
**Site:** https://iqcertificate.org/  
**Test ID (örnek oturum):** NOHXPNJIBL  
**Test süresi:** 4 dakika 43 saniye (maks. 60 dk)

---

## 1. Yönetici Özeti

IQCertificate.org, 30 soruluk görsel-mantıksal bir IQ testi sunan, sonuçları ve sertifikayı **€29** karşılığında satan bir freemium platformdur. Test ücretsiz tamamlanır; skor, analiz raporu ve sertifika ödeme sonrası açılır. Sorular Raven's Progressive Matrices / Culture Fair Intelligence Test tarzında, dil gerektirmeyen pattern tanıma sorularından oluşur.

**İş modeli:** Test ücretsiz → 30 soru tamamlanır → kişisel bilgi formu → ödeme duvarı (€29) → sonuç + sertifika

---

## 2. Site Mimarisi ve Sayfa Haritası

| Sayfa | URL | Açıklama |
|-------|-----|----------|
| Ana Sayfa | `/` | Landing, sosyal kanıt, CTA |
| IQ Test Başlangıç | `/iq-test` | Kurallar, T&C onayı |
| Test Soruları | `/iq-test/{TEST_ID}/{1-30}` | Her soru ayrı sayfa |
| Tamamlama | `/iq-test/{TEST_ID}/complete` | İsim, yaş, cinsiyet formu |
| Ödeme | `/iq-test/{TEST_ID}/payment` | €29 checkout |
| Sonuç Görüntüleme | `/display-results` | Test ID + Security Code |
| Hakkımızda | `/about-us` | Şirket bilgisi |
| SSS | `/iqtest-faq` | Sık sorulan sorular |
| Örnek Sertifika | `/sample-iq-certificate` | Önizleme |
| Örnek Rapor | `/sample-iq-report` | Önizleme |
| Blog | `/blog` | IQ içerikleri |
| IQ Skor | `/iq-score` | Skor açıklamaları |
| Ünlü IQ Skorları | `/celebrity-iq-scores` | İçerik/SEO |
| Culture Fair Test | `/culture-fair-intelligence-test` | Test türü açıklaması |
| IQ Percentile | `/iq-to-percentile-conversion` | Dönüşüm tablosu |
| Çocuk IQ Testi | `/iq-test-for-kids` | Alt ürün |
| İletişim | `/contact-us` | Destek |

### Navigasyon Yapısı

```
Home
About Us ▼
  ├── About Us
  ├── Sample IQ Certificate
  ├── Sample IQ Report
  └── FAQ
IQ Test ▼
  ├── IQ Score
  ├── Celebrity IQ Scores
  ├── Culture Fair Intelligence Test
  ├── IQ to Percentile Conversion
  └── IQ Test for Kids
Blog
Display Results
Contact Us
[EN ▼] Dil seçici
[Start IQ Test] — Ana CTA
```

---

## 3. Kullanıcı Akışı (User Journey)

```mermaid
flowchart TD
    A[Landing Page] --> B[/iq-test - Kurallar & T&C]
    B --> C[Test ID oluşturulur]
    C --> D[Soru 1/30 ... 30/30]
    D --> E[Complete Form: İsim, Yaş, Cinsiyet]
    E --> F[Payment: €29]
    F --> G{Ödeme yapıldı mı?}
    G -->|Evet| H[IQ Skoru + Rapor + Sertifika]
    G -->|Hayır| I[Sonuç görünmez]
    H --> J[Display Results ile tekrar erişim]
```

### Adım Adım Detay

1. **Landing:** "The Most Accurate Online IQ Test" hero, özellikler, 130.573+ test istatistiği, üniversite logoları, testimonial'lar
2. **Test başlangıç:** Konsantrasyon kuralları, 30 soru / 60 dk bilgisi, T&C checkbox
3. **Test:** Her sayfada 1 soru, 6 seçenek (A–F), timer, soru navigasyonu
4. **Tamamlama:** Zorunlu form (Name, Age, Gender)
5. **Ödeme:** €29, indirim kodu alanı, PayPal/Visa/MC/Bitcoin
6. **Sonuç:** Test ID + Security Code ile `/display-results`

---

## 4. Test Özellikleri

| Özellik | Değer |
|---------|-------|
| Soru sayısı | 30 |
| Seçenek sayısı | 6 (A–F) |
| Maksimum süre | 60 dakika (FAQ'da 30 dk da geçiyor) |
| Soru tipi | Görsel pattern tamamlama |
| Zorluk | Kademeli artan |
| Geri dönüş | Evet (soru navigasyonu) |
| Otomatik ilerleme | Hayır (manuel next/finish) |
| Test ID | 10 karakter alfanumerik (örn. NOHXPNJIBL) |

### Ölçülen Bilişsel Alanlar (sitede iddia edilen)

- Memory Retrieval
- Attention and Concentration
- Processing Speed
- Logic: Inductive Reasoning
- Quantitative Reasoning
- Visual Processing

---

## 5. Tüm 30 Soru — Detaylı Kayıt

> Not: Sorular görsel pattern tabanlıdır; metin içermez. Aşağıda tip, pattern açıklaması ve seçilen cevap kayıtlıdır.

| # | Tip | Pattern Açıklaması | Seçilen |
|---|-----|-------------------|---------|
| 1 | Pattern recognition | 3×3 grid, nokta/oval konumları | E |
| 2 | Daire çizgileri | Kesik/tam çizgi rotasyonu | B |
| 3 | Altıgen çizgiler | İç çizgi sayısı ve yönü | F |
| 4 | Grid bölümleme | Horizontal/vertical bölünme | E |
| 5 | Dikdörtgen çizgiler | Çizgi yerleşim pattern'i | C |
| 6 | Yeşil kareler | 3×3 grid diagonal hareket | F |
| 7 | Kare çizgileri | Diagonal ve V-şekilli çizgiler | B |
| 8 | Daire konumu | Merkez/köşe pozisyonları | B |
| 9 | X-bölünmüş kare | Nokta hareketi bölümler arası | A |
| 10 | Diagonal çizgiler | Yön ve kesişim | C |
| 11 | Daire noktaları | Saat yönü rotasyonu | C |
| 12 | Beşgen tarama | Taramalı/boş beşgenler | E |
| 13 | Grid bölümleme | Çizgi sayısı artışı | E |
| 14 | Çiçek şekilleri | Siyah/beyaz nokta rotasyonu | C |
| 15 | Kalp sembolleri | Yeşil/beyaz kalp dağılımı | A |
| 16 | Yıldız-hilal | Doluluk ve konum | E |
| 17 | Eş merkezli daireler | Daire sayısı ve doluluk | C |
| 18 | Daire noktaları | Nokta sayısı ve konumu | A |
| 19 | Yeşil kareler | Diagonal/rotasyon hareketi | C |
| 20 | Oklar | Ok yönleri ve sayıları | F |
| 21 | İskambil sembolleri | Doluluk ve rotasyon | E |
| 22 | Sayı dizileri | 3-2-4, 5-3-1, 1-4-? | B (2) |
| 23 | Küçülen şekiller | Boyut ve doluluk azalması | A |
| 24 | Köşe noktaları | Saat yönü hareket | C |
| 25 | Yeşil kareler | L-şeklinde hareket | C |
| 26 | Çizgi kesişimleri | Horizontal/diagonal | F |
| 27 | Eğimli çizgiler (arc) | Eğrilik yönü | A |
| 28 | Daire-nokta | İç çizgiler ve nokta | B |
| 29 | Daire çizgileri | Horizontal çizgi + nokta | C |
| 30 | Geometrik şekiller | Kesikli/düz, dolu/boş | C |

### Soru Tipi Dağılımı

| Kategori | Oran | Örnek Sorular |
|----------|------|---------------|
| Pattern Recognition | ~40% | 1, 2, 3, 4, 7, 10, 23, 26, 27, 30 |
| Spatial Reasoning | ~25% | 6, 8, 9, 19, 24, 25 |
| Visual Processing | ~20% | 5, 13, 14, 15, 16, 17 |
| Logic & Sequences | ~10% | 20, 21, 22 |
| Attention to Detail | ~5% | 11, 18, 28, 29 |

### Zorluk Eğrisi

- **Soru 1–10:** Temel pattern tanıma
- **Soru 11–20:** Orta — rotasyon, hareket, çoklu element
- **Soru 21–30:** İleri — sayı dizileri, karmaşık kombinasyonlar

---

## 6. Monetizasyon ve Fiyatlandırma

### Paket: €29 (EUR)

1. **IQ Score Evaluation** — Kesin IQ skoru (Verified IQ Test badge)
2. **IQ Score Analysis** — Beyin kapasitesi, dağılım analizi
3. **IQ Score Rankings** — Dünya ve ülke sıralaması
4. **Special IQ Certificate** — Yazdırılabilir, isimli sertifika
5. **Online Results Control** — Test ID + Security Code erişimi

### Ödeme Yöntemleri

- PayPal
- Visa
- Mastercard
- Bitcoin
- Norton Secured badge

### Dönüşüm Stratejisi

- **Sunk cost effect:** 30 soru tamamlandıktan sonra ödeme istenir
- **Fiyat şeffaflığı düşük:** Ana sayfada fiyat yok
- **İndirim kodu alanı:** Checkout'ta mevcut
- **Sample sayfaları:** Sertifika/rapor önizlemesi var ama test öncesi vurgulanmıyor

---

## 7. Teknik Gözlemler

| Alan | Detay |
|------|-------|
| Hosting/CDN | Cloudflare |
| Domain kayıt | 2014-10-23 (Public Interest Registry) |
| SSL | HTTPS |
| Bot koruması | Cloudflare challenge (curl ile erişim zor) |
| URL pattern | RESTful: `/iq-test/{id}/{question}` |
| Test ID | Session bazlı, URL'de taşınır |
| Chat widget | Sağ alt köşe (destek) |
| Dil | EN (dropdown var, Türkçe görülmedi) |

### API / Backend (gözlemlenen)

- Sayfa bazlı routing (SSR veya SPA olabilir)
- Test ID sunucu tarafında oluşturuluyor
- Security Code ödeme/tamamlama sonrası veriliyor (muhtemelen)
- Form validasyonu client-side

---

## 8. İçerik ve Sosyal Kanıt

### İstatistikler (sitede)

- 130.573+ tamamlanan test
- 49.000+ sertifika
- %98 müşteri memnuniyeti
- 13+ yıl deneyim
- 52.000+ aylık ziyaretçi

### Üniversite Logoları

Penn State, University of Virginia, Newcastle University, Washington State University, University of Tennessee

### Testimonial'lar

- George H. Lewis (United States)
- Sandra Bennett (Canada)
- Jordan Stevenson (United Kingdom)
- Tyler J. Hamilton (United States)

### Yasal/Uyarı

Site kendini "entertainment and education company" olarak tanımlıyor. Klinik/psikolojik değerlendirme değil.

---

## 9. UX Analizi

### Güçlü Yönler

- Temiz, dikkat dağıtmayan test arayüzü
- Net progress tracking (soru no, timer, navigasyon)
- Görsel sorular — dil bağımsız
- Sosyal kanıt yoğun kullanımı
- Geri dönüp soru değiştirme imkanı

### Zayıf Yönler

- Ödeme duvarı test sonrası — kullanıcı hayal kırıklığı riski
- Fiyat test öncesi belirtilmiyor
- Zorunlu kişisel bilgi (isim, yaş, cinsiyet) test sonrası
- Email ile otomatik sonuç gönderimi belirsiz
- Security Code kaybı durumunda recovery belirsiz
- FAQ'da süre tutarsızlığı (30 dk vs 60 dk)

---

## 10. Rakip / Benzer Site Notları

- `iqcertificate.com` — benzer marka, farklı domain (SEO raporları mevcut)
- Raven's Progressive Matrices — akademik referans model
- Raymond B. Cattell Culture Fair IQ Scale — test felsefesi referansı

---

## 11. Gelecek Site İnşası İçin Öneriler

### Mutlaka Olması Gerekenler

1. 30 soruluk görsel pattern testi (6 seçenek)
2. Test ID + Security Code sistemi
3. Timer ve soru navigasyonu
4. Tamamlama formu (isim, yaş, cinsiyet)
5. Ödeme entegrasyonu (Stripe/PayPal)
6. Sertifika PDF üretimi
7. IQ rapor sayfası (percentile, ranking)
8. Display Results giriş sayfası

### İyileştirme Fırsatları

1. **Fiyat şeffaflığı** — test öncesi "€X sonuç için" bilgisi
2. **Email kayıt** — sonuçları email ile gönderme
3. **Türkçe dil desteği** — hedef kitleye göre
4. **Mobil-first** — görsel sorular mobilde optimize
5. **Örnek sonuç** — test öncesi sample certificate/rapor gösterimi
6. **Progress save** — yarım kalan testi kaydetme
7. **A/B test** — fiyatlandırma ve paywall konumu

### Teknik Stack Önerisi (iqmaster repo için)

- **Frontend:** React/Next.js veya Vite + React
- **Backend:** Netlify Functions veya Node API
- **DB:** Netlify Database (test oturumları, sonuçlar)
- **Ödeme:** Stripe
- **PDF:** react-pdf veya puppeteer sertifika için
- **Deploy:** Netlify

---

## 12. Test Oturumu Özeti

| Alan | Değer |
|------|-------|
| Test ID | NOHXPNJIBL |
| Tamamlanan soru | 30/30 |
| Süre | 04:43 |
| Skor | Ödeme duvarı — görüntülenemedi |
| Sonraki adım | €29 ödeme gerekli |

---

*Bu rapor, iqcertificate.org sitesinin canlı tarayıcı testi ve public sayfa analizi ile hazırlanmıştır. Gelecek iqmaster projesi için referans dokümandır.*
