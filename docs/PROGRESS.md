# IQMaster Platform v1 — İlerleme Panosu

**Branch:** `cursor/iqmaster-platform-v1-472f`  
**Orkestra:** ana ajan  
**Son güncelleme:** 2026-08-08 12:15 UTC

## Genel ilerleme

| Metrik | Değer |
|--------|-------|
| **Toplam** | **78%** |
| Faz | v1 paralel uygulama |
| Durum | A sürüyor · B/C/D/E bitti · F entegrasyon |

```
[███████████████░░░░░] 78%
```

## İş akışları

| ID | İş | Ajan | % | Durum |
|----|-----|------|---|--------|
| A | Tasarımı referansa yaklaştır | design | 35% | in_progress (local WIP) |
| B | Erken bitirme + görsel-only motor | engine | 100% | done |
| C | Yaş grupları + çocuk bankaları | content | 100% | done · routes wiring |
| D | B2B paket/kredi iskeleti | b2b | 100% | done · routed |
| E | PDF + sosyal paylaşım | share | 100% | done · wired into Results |
| F | Entegrasyon + build + push | orchestrator | 70% | integrating |

## v1 kabul kriterleri

- [ ] Tasarım referansa daha yakın
- [x] İstediğin soruda bitir + güven notu
- [x] Sadece görsel sorular (adult bank)
- [x] Çocuk / yaş grupları bankaları
- [x] Paketler: Koç, Öğretmen, Aile, Şirket, İK
- [x] PDF rapor + sosyal paylaşım UI
- [ ] Build yeşil (A bitince final)

## Günlük notlar

- E Results’a bağlandı (`ReportActions`)
- C dosyaları commit + `/age-groups`, `/kids-intro` route
- A tasarım dosyaları hâlâ ajan WIP
