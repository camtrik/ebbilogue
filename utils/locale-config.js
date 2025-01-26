const defaultLang = 'en'
const defaultLangPack = 'strings'

const useLanguages = (lang_pack = defaultLangPack) => {
  const en = require(`/public/locales/en-US/${lang_pack}.json`)
  const zh = require(`/public/locales/zh-CN/${lang_pack}.json`)
  const ja = require(`/public/locales/ja-JP/${lang_pack}.json`)
  return {
    translations: {
      en: en,
      zh: zh,
      ja: ja,
    },
  }
}

export { defaultLang, defaultLangPack }
export default useLanguages
