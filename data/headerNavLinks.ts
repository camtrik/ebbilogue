export default function useHeaderNavLinks(translate: (key: string) => string | JSX.Element) {
  const t = translate
  const headerNavLinks = [
    { href: '/', titleKey: 'home_title' },
    { href: '/blog', titleKey: 'menu_blog' },
    { href: '/album', titleKey: 'menu_album' },
    // { href: '/tags', titleKey: 'menu_tag' },
    { href: '/projects', titleKey: 'menu_projects' },
    { href: '/about', titleKey: 'menu_about' },
  ].map((link) => ({
    href: link.href,
    title: t(link.titleKey),
    key: link.titleKey, // 使用翻译的 key 作为 React 的 key
  }))

  return headerNavLinks
}
