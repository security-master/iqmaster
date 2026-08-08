type MessageTree = {
  [key: string]: string | MessageTree
}

export type { MessageTree }

export const messages: Record<'en' | 'tr', MessageTree> = {
  en: {
    nav: {
      progress: 'Progress',
      ageGroups: 'Age Groups',
      packages: 'Packages',
      organizations: 'Organizations',
      certificate: 'Certificate',
      blog: 'Blog',
      faq: 'FAQ',
      startTest: 'Start Test',
      tagline: 'IQ Assessment',
      menu: 'Menu',
      close: 'Close',
    },
    common: {
      language: 'Language',
    },
    home: {
      seoTitle: 'IQMaster — Private Online IQ Assessment & Certificate',
      seoDescription:
        'A refined, culture-fair IQ assessment for discerning adults. Clear score, percentile, PDF report, and printable certificate.',
      hero: {
        brand: 'IQMaster',
        title: 'A private measure of cognitive ability',
        lead: 'Culture-fair visual reasoning. A precise score, refined PDF report, and printable certificate—for people who expect polish.',
        ctaPrimary: 'Begin your assessment',
        ctaSecondary: 'Preview the certificate',
        meta: '30 visual items · 20–40 minutes · report unlock $19',
      },
      people: {
        eyebrow: 'Private assessment',
        title: 'Crafted for people who pay for clarity',
        lead: 'IQMaster is built for adults and organizations who want a serious visual score—not a novelty quiz. Quiet design. Transparent unlock. A certificate you can stand behind.',
        ctaPackages: 'View packages',
        ctaOrg: 'For organizations',
        imageAlt: 'Professionals collaborating in a bright workspace',
      },
      celebs: {
        eyebrow: 'Social comparison',
        title: 'Famous people & celebrity IQ scores',
        lead: 'See the reported scores behind today’s most talked-about names—then measure your own with IQMaster.',
        note: 'Scores shown are widely reported estimates for entertainment and comparison. They are not clinical diagnoses.',
        cta: 'Compare your IQ score',
      },
      abilities: {
        eyebrow: 'Measured dimensions',
        title: 'Six abilities. One precise score.',
        lead: 'Each item probes culture-fair matrix reasoning—so results reflect thinking, not trivia.',
        items: {
          memory: {
            title: 'Memory Retrieval',
            text: 'Hold, compare, and recall patterns across each visual item.',
          },
          attention: {
            title: 'Attention',
            text: 'Stay precise as spacing, shape, and rules shift from item to item.',
          },
          speed: {
            title: 'Processing Speed',
            text: 'A timed, uncluttered flow that rewards accurate scanning.',
          },
          inductive: {
            title: 'Inductive Reasoning',
            text: 'Detect the hidden rule in each matrix and complete it.',
          },
          quantitative: {
            title: 'Quantitative Logic',
            text: 'Proportion and sequence without trivia or long reading.',
          },
          visual: {
            title: 'Visual Processing',
            text: 'Rotation, symmetry, progression, and figure–ground judgment.',
          },
        },
      },
      trust: {
        eyebrow: 'Results you can use',
        title: 'A report and certificate with presence',
        lead: 'Unlock a clear IQ score, percentile context, ability profile, and a printable IQMaster certificate—designed to look deliberate on paper and on screen.',
        ctaReport: 'View sample report',
        ctaCertificate: 'View sample certificate',
        imageAlt: 'Advisor reviewing assessment results with a client',
      },
      testimonials: {
        eyebrow: 'From recent assessments',
        title: 'What discerning test takers notice',
        items: {
          sandra: {
            quote:
              'Challenging without being gimmicky. The report explained my score with the clarity I expected from a paid assessment.',
            location: 'Toronto',
          },
          george: {
            quote:
              'Transparent pricing and a certificate worth keeping. Feels closer to a private evaluation than a viral quiz.',
            location: 'New York',
          },
          jordan: {
            quote:
              'Quiet, polished, and decisive. I finished knowing exactly what my score meant—and how to share it.',
            location: 'London',
          },
        },
      },
      how: {
        eyebrow: 'The path',
        title: 'Three steps. No theatre.',
        lead: 'A composed experience from first question to unlocked dossier—built for people who value finish quality as much as the score itself.',
        imageAlt: 'Focused preparation for a visual reasoning assessment',
        steps: {
          one: {
            title: 'Begin the assessment',
            text: 'Thirty culture-fair matrix items. One focused sitting, no distractions.',
          },
          two: {
            title: 'Complete with care',
            text: 'Work through each problem at your pace within the session window.',
          },
          three: {
            title: 'Unlock your dossier',
            text: 'Score, percentile, ability profile, PDF report, and printable certificate.',
          },
        },
      },
      finalCta: {
        eyebrow: 'Begin when ready',
        title: 'Reserve your score with IQMaster',
        lead: 'A private, culture-fair assessment with a certificate worth the unlock.',
        cta: 'Start the assessment',
      },
    },
    footer: {
      blurb:
        'A private, culture-fair IQ assessment with a precise score, refined report, and printable certificate—for individuals and organizations who expect finish quality.',
      test: 'Test',
      ageGroups: 'Age Groups',
      kidsTest: 'Kids Test',
      adultTest: 'Adult IQ Test',
      displayResults: 'Display Results',
      sampleCertificate: 'Sample Certificate',
      sampleReport: 'Sample Report',
      organizations: 'Organizations',
      packages: 'Packages',
      forOrganizations: 'For Organizations',
      orgDashboard: 'Org Dashboard',
      creditHistory: 'Credit History',
      company: 'Company',
      about: 'About',
      pricing: 'Pricing',
      iqScoreGuide: 'IQ Score Guide',
      blog: 'Blog',
      faq: 'FAQ',
      contact: 'Contact',
      copyright: 'IQMaster. Entertainment and education use.',
      meta: '30 questions · 20–40 minutes · printable certificate',
    },
    contact: {
      title: 'Talk to the team',
      submit: 'Send message',
    },
    results: {
      title: 'Your results',
      share: 'Share',
      download: 'Download',
    },
  },
  tr: {
    nav: {
      progress: 'İlerleme',
      ageGroups: 'Yaş Grupları',
      packages: 'Paketler',
      organizations: 'Kurumlar',
      certificate: 'Sertifika',
      blog: 'Blog',
      faq: 'SSS',
      startTest: 'Teste Başla',
      tagline: 'IQ Değerlendirme',
      menu: 'Menü',
      close: 'Kapat',
    },
    common: {
      language: 'Dil',
    },
    home: {
      seoTitle: 'IQMaster — Özel Online IQ Değerlendirmesi ve Sertifika',
      seoDescription:
        'Seçici yetişkinler için rafine, kültürler arası IQ değerlendirmesi. Net puan, yüzdelik dilim, PDF rapor ve basılabilir sertifika.',
      hero: {
        brand: 'IQMaster',
        title: 'Bilişsel yeteneğin özel bir ölçümü',
        lead: 'Kültürler arası görsel muhakeme. Net puan, rafine PDF rapor ve basılabilir sertifika—kalite bekleyenler için.',
        ctaPrimary: 'Değerlendirmeye başla',
        ctaSecondary: 'Sertifikayı önizle',
        meta: '30 görsel madde · 20–40 dakika · rapor açılışı $19',
      },
      people: {
        eyebrow: 'Özel değerlendirme',
        title: 'Netlik için ödeme yapanlar için tasarlandı',
        lead: 'IQMaster, eğlencelik bir test değil; ciddi bir görsel skor isteyen yetişkinler ve kurumlar için. Sakin tasarım. Şeffaf açılış. Arkasına durabileceğiniz bir sertifika.',
        ctaPackages: 'Paketleri gör',
        ctaOrg: 'Kurumlar için',
        imageAlt: 'Aydınlık bir çalışma alanında birlikte çalışan profesyoneller',
      },
      celebs: {
        eyebrow: 'Sosyal karşılaştırma',
        title: 'Ünlülerin IQ skorları',
        lead: 'Günümüzün en konuşulan isimlerinin bildirilen skorlarına bakın—sonra IQMaster ile kendi skorunuzu ölçün.',
        note: 'Gösterilen skorlar eğlence ve karşılaştırma amaçlı, yaygın bildirilen tahminlerdir. Klinik tanı değildir.',
        cta: 'IQ skorunuzu karşılaştırın',
      },
      abilities: {
        eyebrow: 'Ölçülen boyutlar',
        title: 'Altı yetenek. Tek net skor.',
        lead: 'Her madde kültürler arası matris muhakemesini yoklar—sonuçlar ezbere değil düşünmeye dayanır.',
        items: {
          memory: {
            title: 'Bellek Erişimi',
            text: 'Her görsel maddede örüntüleri tutun, karşılaştırın ve geri çağırın.',
          },
          attention: {
            title: 'Dikkat',
            text: 'Boşluk, şekil ve kurallar değişirken hassasiyetinizi koruyun.',
          },
          speed: {
            title: 'İşlem Hızı',
            text: 'Doğru taramayı ödüllendiren zamanlı, sade bir akış.',
          },
          inductive: {
            title: 'Tümevarımsal Muhakeme',
            text: 'Her matristeki gizli kuralı bulun ve tamamlayın.',
          },
          quantitative: {
            title: 'Nicel Mantık',
            text: 'Uzun okuma veya genel kültür olmadan oran ve dizi.',
          },
          visual: {
            title: 'Görsel İşleme',
            text: 'Döndürme, simetri, ilerleme ve şekil–zemin yargısı.',
          },
        },
      },
      trust: {
        eyebrow: 'Kullanabileceğiniz sonuçlar',
        title: 'Varlık hissi veren rapor ve sertifika',
        lead: 'Net IQ skoru, yüzdelik bağlam, yetenek profili ve basılabilir IQMaster sertifikasının kilidini açın—ekranda ve kağıtta bilinçli görünsün diye tasarlandı.',
        ctaReport: 'Örnek raporu gör',
        ctaCertificate: 'Örnek sertifikayı gör',
        imageAlt: 'Danışmanın bir müşteriyle değerlendirme sonuçlarını incelemesi',
      },
      testimonials: {
        eyebrow: 'Son değerlendirmelerden',
        title: 'Seçici katılımcıların fark ettiği şey',
        items: {
          sandra: {
            quote:
              'Gösterişli olmadan zorlayıcı. Rapor, ücretli bir değerlendirmeden beklediğim netlikte skorumu açıkladı.',
            location: 'Toronto',
          },
          george: {
            quote:
              'Şeffaf fiyatlandırma ve saklanmaya değer bir sertifika. Viral bir testten çok özel bir değerlendirmeye yakın.',
            location: 'New York',
          },
          jordan: {
            quote:
              'Sakin, rafine ve net. Skorumun ne anlama geldiğini ve nasıl paylaşacağımı bilerek bitirdim.',
            location: 'Londra',
          },
        },
      },
      how: {
        eyebrow: 'Yol',
        title: 'Üç adım. Gösteriş yok.',
        lead: 'İlk sorudan açılmış dosyaya kadar ölçülü bir deneyim—skor kadar bitiş kalitesine önem verenler için.',
        imageAlt: 'Görsel muhakeme değerlendirmesine odaklı hazırlık',
        steps: {
          one: {
            title: 'Değerlendirmeyi başlatın',
            text: 'Otuz kültürler arası matris maddesi. Tek odaklı oturum, dikkat dağıtıcı yok.',
          },
          two: {
            title: 'Özenle tamamlayın',
            text: 'Oturum süresi içinde her problemi kendi temponuzda çözün.',
          },
          three: {
            title: 'Dosyanızın kilidini açın',
            text: 'Skor, yüzdelik dilim, yetenek profili, PDF rapor ve basılabilir sertifika.',
          },
        },
      },
      finalCta: {
        eyebrow: 'Hazır olduğunuzda başlayın',
        title: 'IQMaster ile skorunuzu ayırtın',
        lead: 'Kilidi açmaya değer sertifikayla özel, kültürler arası bir değerlendirme.',
        cta: 'Değerlendirmeyi başlat',
      },
    },
    footer: {
      blurb:
        'Net skor, rafine rapor ve basılabilir sertifika sunan özel, kültürler arası bir IQ değerlendirmesi—bitiş kalitesi bekleyen bireyler ve kurumlar için.',
      test: 'Test',
      ageGroups: 'Yaş Grupları',
      kidsTest: 'Çocuk Testi',
      adultTest: 'Yetişkin IQ Testi',
      displayResults: 'Sonuçları Göster',
      sampleCertificate: 'Örnek Sertifika',
      sampleReport: 'Örnek Rapor',
      organizations: 'Kurumlar',
      packages: 'Paketler',
      forOrganizations: 'Kurumlar İçin',
      orgDashboard: 'Kurum Paneli',
      creditHistory: 'Kredi Geçmişi',
      company: 'Şirket',
      about: 'Hakkımızda',
      pricing: 'Fiyatlandırma',
      iqScoreGuide: 'IQ Skor Rehberi',
      blog: 'Blog',
      faq: 'SSS',
      contact: 'İletişim',
      copyright: 'IQMaster. Eğlence ve eğitim amaçlı kullanım.',
      meta: '30 soru · 20–40 dakika · basılabilir sertifika',
    },
    contact: {
      title: 'Ekiple konuşun',
      submit: 'Mesaj gönder',
    },
    results: {
      title: 'Sonuçlarınız',
      share: 'Paylaş',
      download: 'İndir',
    },
  },
}
