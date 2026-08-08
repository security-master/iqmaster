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
      startTest: 'Begin Assessment',
    },
    home: {
      hero: {
        brand: 'IQMaster',
        title: 'A private measure of cognitive ability',
        lead: 'Culture-fair visual reasoning. A precise score, refined PDF report, and printable certificate—for people who expect polish.',
        ctaPrimary: 'Begin your assessment',
        ctaSecondary: 'Preview the certificate',
        meta: '30 visual items · 20–40 minutes · report unlock $19',
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
      startTest: 'Değerlendirmeyi Başlat',
    },
    home: {
      hero: {
        brand: 'IQMaster',
        title: 'Bilişsel yeteneğin özel bir ölçümü',
        lead: 'Kültürler arası görsel muhakeme. Net puan, rafine PDF rapor ve basılabilir sertifika—kalite bekleyenler için.',
        ctaPrimary: 'Değerlendirmeye başla',
        ctaSecondary: 'Sertifikayı önizle',
        meta: '30 görsel madde · 20–40 dakika · rapor açılışı $19',
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
