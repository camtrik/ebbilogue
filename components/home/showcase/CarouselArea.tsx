'use client'
import { motion } from 'framer-motion'
import { useTranslation } from 'utils/locale'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SHOWCASE_IMAGES = [
  'https://res.cloudinary.com/camtrik/image/upload/v1737910275/00154-320790827_neorft.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737910321/00140-2807411078_l250nj.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991589/00192-3141175425_oie8yc.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1738170498/00298-2664667207_d8i9w6.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737901033/00103-736225594_eqhwzm.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991713/00240-2547697752_irljwa.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991768/00259-3107429704_tjlnkp.png',
]

export default function CarouselArea() {
  const { t } = useTranslation()
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

  function NextArrow(props) {
    const { onClick } = props
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition hover:bg-white/50"
      >
        <ChevronRight size={24} color="black" />
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
        <ChevronLeft size={24} color="black" />
      </button>
    )
  }

  return (
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
        .slick-slide {
          width: 100% !important;
        }
        .slick-track {
          display: flex !important;
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
  )
}
