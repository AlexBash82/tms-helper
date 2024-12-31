import React, { useEffect, useRef } from 'react'
import ePub, { Rendition } from 'epubjs'

const Epub = () => {
  const bookRef = useRef<HTMLDivElement | null>(null)
  const renditionRef = useRef<Rendition | null>(null)

  const epubFile = '/mwb_E_202411.epub'

  useEffect(() => {
    if (epubFile && bookRef.current) {
      console.log('Rendering book...')
      const book = ePub(epubFile)

      book.ready
        .then(() => {
          console.log('Book loaded successfully')
          console.log('Table of Contents:', book.navigation.toc)

          // Рендерим первую главу
          const startHref =
            book.navigation.toc[1]?.href || book.spine.get(0)?.href

          if (!bookRef.current) {
            console.error('Error: bookRef is null.')
            return
          }

          renditionRef.current = book.renderTo(bookRef.current, {
            width: '100%',
            height: '100%',
          })

          renditionRef.current
            .display(startHref)
            .then(() => console.log('EPUB displayed successfully'))
            .catch((error) => console.error('Error rendering EPUB:', error))
        })
        .catch((error) => {
          console.error('Error loading book:', error)
        })
    }

    return () => {
      renditionRef.current?.destroy()
    }
  }, [epubFile])

  return (
    <div>
      <div
        ref={bookRef}
        style={{ width: '1100px', height: '600px', border: '1px solid black' }}
      />
    </div>
  )
}

export default Epub
