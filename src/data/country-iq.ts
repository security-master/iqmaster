/** National average IQ estimates commonly cited in public datasets (entertainment comparison). */
export type CountryIq = {
  code: string
  name: string
  nameTr: string
  average: number
}

export const COUNTRY_IQ: CountryIq[] = [
  { code: 'SG', name: 'Singapore', nameTr: 'Singapur', average: 105 },
  { code: 'HK', name: 'Hong Kong', nameTr: 'Hong Kong', average: 105 },
  { code: 'KR', name: 'South Korea', nameTr: 'Güney Kore', average: 104 },
  { code: 'JP', name: 'Japan', nameTr: 'Japonya', average: 104 },
  { code: 'TW', name: 'Taiwan', nameTr: 'Tayvan', average: 104 },
  { code: 'CN', name: 'China', nameTr: 'Çin', average: 103 },
  { code: 'FI', name: 'Finland', nameTr: 'Finlandiya', average: 101 },
  { code: 'NL', name: 'Netherlands', nameTr: 'Hollanda', average: 100 },
  { code: 'DE', name: 'Germany', nameTr: 'Almanya', average: 99 },
  { code: 'CA', name: 'Canada', nameTr: 'Kanada', average: 99 },
  { code: 'GB', name: 'United Kingdom', nameTr: 'Birleşik Krallık', average: 99 },
  { code: 'NZ', name: 'New Zealand', nameTr: 'Yeni Zelanda', average: 99 },
  { code: 'SE', name: 'Sweden', nameTr: 'İsveç', average: 98 },
  { code: 'AU', name: 'Australia', nameTr: 'Avustralya', average: 98 },
  { code: 'BE', name: 'Belgium', nameTr: 'Belçika', average: 98 },
  { code: 'AT', name: 'Austria', nameTr: 'Avusturya', average: 98 },
  { code: 'CH', name: 'Switzerland', nameTr: 'İsviçre', average: 98 },
  { code: 'US', name: 'United States', nameTr: 'Amerika Birleşik Devletleri', average: 98 },
  { code: 'NO', name: 'Norway', nameTr: 'Norveç', average: 97 },
  { code: 'FR', name: 'France', nameTr: 'Fransa', average: 97 },
  { code: 'IT', name: 'Italy', nameTr: 'İtalya', average: 96 },
  { code: 'ES', name: 'Spain', nameTr: 'İspanya', average: 96 },
  { code: 'PL', name: 'Poland', nameTr: 'Polonya', average: 96 },
  { code: 'CZ', name: 'Czechia', nameTr: 'Çekya', average: 96 },
  { code: 'HU', name: 'Hungary', nameTr: 'Macaristan', average: 96 },
  { code: 'PT', name: 'Portugal', nameTr: 'Portekiz', average: 94 },
  { code: 'GR', name: 'Greece', nameTr: 'Yunanistan', average: 93 },
  { code: 'RU', name: 'Russia', nameTr: 'Rusya', average: 96 },
  { code: 'TR', name: 'Türkiye', nameTr: 'Türkiye', average: 89 },
  { code: 'IL', name: 'Israel', nameTr: 'İsrail', average: 94 },
  { code: 'AE', name: 'United Arab Emirates', nameTr: 'Birleşik Arap Emirlikleri', average: 87 },
  { code: 'SA', name: 'Saudi Arabia', nameTr: 'Suudi Arabistan', average: 84 },
  { code: 'BR', name: 'Brazil', nameTr: 'Brezilya', average: 85 },
  { code: 'MX', name: 'Mexico', nameTr: 'Meksika', average: 86 },
  { code: 'AR', name: 'Argentina', nameTr: 'Arjantin', average: 91 },
  { code: 'IN', name: 'India', nameTr: 'Hindistan', average: 82 },
  { code: 'ID', name: 'Indonesia', nameTr: 'Endonezya', average: 84 },
  { code: 'EG', name: 'Egypt', nameTr: 'Mısır', average: 81 },
  { code: 'ZA', name: 'South Africa', nameTr: 'Güney Afrika', average: 77 },
  { code: 'NG', name: 'Nigeria', nameTr: 'Nijerya', average: 71 },
].sort((a, b) => a.name.localeCompare(b.name))

export function getCountryByCode(code: string | undefined | null): CountryIq | undefined {
  if (!code) return undefined
  return COUNTRY_IQ.find((c) => c.code === code)
}
