# IQMaster Platform v1 — İlerleme Panosu

**Branch:** `cursor/iqmaster-platform-v1-472f`  
**Orkestra:** ana ajan  
**Son güncelleme:** 2026-08-08 12:10 UTC

## Genel ilerleme

| Metrik | Değer |
|--------|-------|
| **Toplam** | **48%** |
| Faz | v1 paralel uygulama |
| Durum | D+E bitti · A/B/C sürüyor · F kısmi entegrasyon |

```
[█████████░░░░░░░░░░░] 48%
```

## İş akışları

| ID | İş | Ajan ID | Dosya sahipliği | % | Durum |
|----|-----|---------|-----------------|---|--------|
| A | Tasarımı referansa yaklaştır | `bc-3748bdb0…` | styles, Header/Footer, Home/About/FAQ | 35% | in_progress |
| B | Erken bitirme + görsel-only motor | `bc-b2cf550a…` | session/iq, Test*, questions.ts | 100% | done |
| C | Yaş grupları + çocuk bankaları | `bc-42f69d55…` | test-catalog, kids/teens banks, AgeSelect | 5% | running |
| D | B2B paket/kredi iskeleti | `bc-2f3779d6…` | packages, billing, OrgDashboard | 100% | done |
| E | PDF + sosyal paylaşım | `bc-c74bb61b…` | report/*, ShareButtons, ReportActions | 100% | done |
| F | Entegrasyon + build + push | orchestrator | App.tsx routing, çakışma çözümü | 35% | partial — D/E routes wired |

## v1 kabul kriterleri

- [ ] Tasarım referansa daha yakın
- [ ] İstediğin soruda bitir + güven notu
- [ ] Sadece görsel sorular
- [ ] Çocuk / yaş grupları
- [ ] Paketler: Koç, Öğretmen, Aile, Şirket, İK
- [ ] PDF rapor
- [ ] Sosyal paylaşım
- [ ] Build yeşil

## Nasıl bakılır?

Bu dosya: `docs/PROGRESS.md` — her ajan kendi satırını günceller; orkestra toplam % hesaplar.

## Günlük notlar

- 12:08 — 5 paralel ajan başlatıldı (A–E). Orkestra entegrasyonu ajanlar bitince.
