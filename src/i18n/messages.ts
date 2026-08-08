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
      blog: 'Blog',
      faq: 'FAQ',
      startTest: 'Start IQ Test',
    },
    home: {
      hero: {
        brand: 'IQMaster',
        title: 'Discover your cognitive potential',
        lead: 'A professional, culture-fair IQ assessment with a clear score, PDF report, and shareable certificate.',
        ctaPrimary: 'Find Your IQ Score',
        ctaSecondary: 'Choose age group',
        meta: '30 visual questions · about 20–40 minutes · report unlock $19',
      },
    },
    common: {
      language: 'Language',
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
      blog: 'Blog',
      faq: 'SSS',
      startTest: 'IQ Testine Başla',
    },
    home: {
      hero: {
        brand: 'IQMaster',
        title: 'Bilişsel potansiyelinizi keşfedin',
        lead: 'Net bir puan, PDF rapor ve paylaşılabilir sertifika sunan profesyonel, kültürler arası IQ değerlendirmesi.',
        ctaPrimary: 'IQ Puanınızı Öğrenin',
        ctaSecondary: 'Yaş grubu seçin',
        meta: '30 görsel soru · yaklaşık 20–40 dakika · rapor açılışı $19',
      },
    },
    common: {
      language: 'Dil',
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
