'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useContext } from 'react'
import { LanguageContext } from 'utils/locale'

const achievementsData = {
  zh: [
    {
      game: '上古卷轴5：天际',
      title: '龙裔',
      image: '/static/images/games/dragonborn.jpg',
      color: 'from-sky-800/90 via-slate-300/50 to-white/80',
      url: 'https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/',
    },
    {
      game: '艾尔登法环',
      title: '艾尔登之王',
      image: '/static/images/games/age-of-stars.jpg',
      color: 'from-blue-600/90 to-transparent',
      url: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    },
    {
      game: '全面战争：战锤3',
      title: '龙帝',
      image: '/static/images/games/dragon-demon.jpg',
      color: 'from-red-700/90 to-transparent',
      url: 'https://store.steampowered.com/app/1142710/Total_War_WARHAMMER_III/',
    },
    {
      game: '只狼：影逝二度',
      title: '只狼',
      image: '/static/images/games/sekiro.jpg',
      color: 'from-amber-700/90 to-transparent',
      url: 'https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition/',
    },
  ],
  en: [
    {
      game: 'The Elder Scrolls V: Skyrim',
      title: 'Dragonborn',
      image: '/static/images/games/dragonborn.jpg',
      color: 'from-sky-800/90 via-slate-300/50 to-white/80',
      url: 'https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/',
    },
    {
      game: 'Elden Ring',
      title: 'Elden Lord',
      image: '/static/images/games/age-of-stars.jpg',
      color: 'from-blue-600/90 to-transparent',
      url: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    },
    {
      game: 'Total War: Warhammer 3',
      title: 'Dragon Emperor',
      image: '/static/images/games/dragon-demon.jpg',
      color: 'from-red-700/90 to-transparent',
      url: 'https://store.steampowered.com/app/1142710/Total_War_WARHAMMER_III/',
    },
    {
      game: 'Sekiro: Shadows Die Twice',
      title: 'Sekiro',
      image: '/static/images/games/sekiro.jpg',
      color: 'from-amber-700/90 to-transparent',
      url: 'https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition/',
    },
  ],
  ja: [
    {
      game: 'The Elder Scrolls V: Skyrim',
      title: 'ドラゴンボーン',
      image: '/static/images/games/dragonborn.jpg',
      color: 'from-sky-800/90 via-slate-300/50 to-white/80',
      url: 'https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/',
    },
    {
      game: 'Elden Ring',
      title: 'エルデンロード',
      image: '/static/images/games/age-of-stars.jpg',
      color: 'from-blue-600/90 to-transparent',
      url: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    },
    {
      game: 'Total War: Warhammer 3',
      title: '龍帝',
      image: '/static/images/games/dragon-demon.jpg',
      color: 'from-red-700/90 to-transparent',
      url: 'https://store.steampowered.com/app/1142710/Total_War_WARHAMMER_III/',
    },
    {
      game: 'SEKIRO: SHADOWS DIE TWICE',
      title: '隻狼',
      image: '/static/images/games/sekiro.jpg',
      color: 'from-amber-700/90 to-transparent',
      url: 'https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition/',
    },
  ],
}

export default function GameAchievements() {
  // 使用项目中的语言上下文
  const { currentLang } = useContext(LanguageContext)
  const lang = currentLang || 'en'

  const achievements = achievementsData[lang] || achievementsData['en']

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-xl shadow-lg"
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={achievement.image}
              alt={achievement.game}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${achievement.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`}
            />

            {/* 称号和游戏名信息 */}
            <motion.div
              className="absolute inset-x-0 bottom-0 p-4 text-white"
              initial={{ y: 0 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-center text-lg font-bold drop-shadow-lg">{achievement.title}</h3>
              <a
                href={achievement.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block h-0 overflow-hidden text-center text-sm text-white opacity-0 transition-all duration-300 hover:text-blue-300 group-hover:h-auto group-hover:opacity-100"
              >
                {achievement.game}
                <span className="ml-1 inline-block transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
