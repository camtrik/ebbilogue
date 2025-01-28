'use client'
import Link from '@/components/Link'
import { slug } from 'github-slugger'
import { useTranslation } from 'utils/locale'
import tagData from 'app/tag-data.json'
import Image from 'next/image'
import { allBlogs } from 'contentlayer/generated'
import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const COLORS = ['text-blue-700', 'text-indigo-700', 'text-purple-700', 'text-violet-700']

const SHOWCASE_IMAGES = [
  'https://res.cloudinary.com/camtrik/image/upload/v1737910275/00154-320790827_neorft.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991653/00181-3663116070_rbsjfe.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991589/00192-3141175425_oie8yc.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737901033/00103-736225594_eqhwzm.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991713/00240-2547697752_irljwa.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991768/00259-3107429704_tjlnkp.png',
]

export default function ShowcasePanel() {
  const { t } = useTranslation()
  const sortedTags = Object.keys(tagData).sort((a, b) => tagData[b] - tagData[a])
  const totalPosts = allBlogs.length
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_, next) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: 'slick-dots custom-dots',
    appendDots: (dots) => <ul className="flex items-center justify-center gap-2">{dots}</ul>,
    customPaging: (i) => (
      <button className="!h-2 !w-2 before:content-['']">
        <div
          className={`h-2 w-2 rounded-full transition-all duration-200 ${
            i === currentSlide ? 'bg-black' : 'bg-white/90'
          }`}
        />
      </button>
    ),
  }

  const getTagStyle = (count: number, index: number) => {
    const size = Math.floor((count / Math.max(...Object.values(tagData))) * 3)
    return {
      className: `relative font-bold ${COLORS[index % COLORS.length]} hover:text-white/90 transition-colors duration-200`,
      fontSize: `${1.1 + size * 0.2}rem`,
    }
  }

  function NextArrow(props) {
    const { onClick } = props
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition hover:bg-white/50"
      >
        <ChevronRight size={24} />
      </button>
    )
  }

  function PrevArrow(props) {
    const { onClick } = props
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition hover:bg-white/50"
      >
        <ChevronLeft size={24} />
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Carousel area */}
      <div className="relative w-full overflow-hidden rounded-2xl md:w-2/3">
        <style jsx global>{`
          .slick-dots {
            bottom: 16px;
          }
          .slick-dots li {
            margin: 0 1px;
          }
          .slick-dots li button:before {
            display: none;
          }
        `}</style>
        <Slider ref={sliderRef} {...settings}>
          {SHOWCASE_IMAGES.map((img, index) => (
            <div key={index} className="relative h-96 w-full">
              <Image
                src={img}
                alt={`Showcase ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Right side tag cloud and stats */}
      <div className="flex w-full flex-col gap-4 md:w-1/3">
        <div className="card bg-blue-purple flex-1 overflow-hidden rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-start gap-4">
            {sortedTags.map((tag, index) => {
              const style = getTagStyle(tagData[tag], index)
              return (
                <div
                  key={tag}
                  className="relative"
                  style={{
                    opacity: 1,
                    transform: 'none',
                    transition: `all 0.3s ease ${index * 0.05}s`,
                  }}
                >
                  <Link
                    href={`/tags/${slug(tag)}`}
                    className={style.className}
                    style={{ fontSize: style.fontSize }}
                  >
                    {tag}
                    <span className="absolute -right-4 -top-2.5 text-xs font-normal text-gray-600">
                      {tagData[tag]}
                    </span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card bg-blue-purple-animated flex h-24 items-center justify-around overflow-hidden rounded-2xl p-4">
          <div className="text-center">
            <p className="text-lg text-gray-800">Total Posts</p>
            <p className="text-2xl font-bold text-gray-800">{totalPosts}</p>
          </div>
          <div className="h-12 w-px bg-gray-400" />
          <div className="text-center">
            <p className="text-lg text-gray-800">Total Tags</p>
            <p className="text-2xl font-bold text-gray-800">{sortedTags.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
