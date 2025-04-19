import React, { useState, useRef, ReactNode, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  children: ReactNode
}

export default function Carousel({ children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const childrenArray = React.Children.toArray(children)
  const totalItems = childrenArray.length

  const itemsPerPage = {
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  }

  const [itemsToShow, setItemsToShow] = useState(itemsPerPage.lg)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsToShow(itemsPerPage.lg)
      else if (window.innerWidth >= 768) setItemsToShow(itemsPerPage.md)
      else if (window.innerWidth >= 640) setItemsToShow(itemsPerPage.sm)
      else setItemsToShow(itemsPerPage.xs)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const canScroll = totalItems > itemsToShow
  const canScrollLeft = canScroll && currentIndex > 0
  const canScrollRight = canScroll && currentIndex + itemsToShow < totalItems

  const handlePrev = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => Math.max(prev - itemsToShow, 0))
    }
  }

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => Math.min(prev + itemsToShow, totalItems - itemsToShow))
    }
  }

  useEffect(() => {
    if (containerRef.current && canScroll) {
      const containerWidth = containerRef.current.offsetWidth
      const itemWidth = containerWidth / itemsToShow
      setTranslateX(-currentIndex * itemWidth)
    } else {
      setTranslateX(0)
    }
  }, [currentIndex, itemsToShow, canScroll, totalItems])

  const containerClasses = canScroll
    ? "grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] md:auto-cols-[33.33%] lg:auto-cols-[25%]"
    : "flex flex-row flex-wrap justify-start xs:justify-center"

  return (
    <div className="relative overflow-hidden w-full">
      <div
        ref={containerRef}
        className={`${containerClasses} transition-transform duration-1000 ease-in-out`}
        style={canScroll ? { transform: `translateX(${translateX}px)` } : {}}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className={canScroll ? "px-1" : "p-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"}>
            {child}
          </div>
        ))}
      </div>
      {canScrollLeft && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-5 transition-opacity duration-300 hover:bg-opacity-75"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-5 transition-opacity duration-300 hover:bg-opacity-75 mr-1"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  )
}