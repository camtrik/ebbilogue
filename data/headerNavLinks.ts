export default function useHeaderNavLinks(translate: (key: string) => string | JSX.Element) {
  const t = translate
  const headerNavLinks = [
    { href: '/', titleKey: 'home_title' },
    { href: '/blog', titleKey: 'menu_blog' },
    // { href: '/album', titleKey: 'menu_album' },
    // { href: '/tags', titleKey: 'menu_tag' },
    { href: '/projects', titleKey: 'menu_projects' },
    { href: '/about', titleKey: 'menu_about' },
    {
      titleKey: 'menu_more',
      key: 'menu_more',
      items: [
        { href: '/gaming', titleKey: 'sub_menu_gaming' },
        { href: '/anime', titleKey: 'sub_menu_anime' },
      ],
    },
  ].map((link) => ({
    ...link,
    title: t(link.titleKey),
    key: link.titleKey,
    items: link.items?.map((item) => ({
      ...item,
      title: t(item.titleKey),
    })),
  }))

  return headerNavLinks
}
