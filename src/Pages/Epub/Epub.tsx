import React, { useEffect, useRef } from 'react'
import ePub, { Rendition } from 'epubjs'

const Epub = () => {
  const bookRef = useRef(null)
  const renditionRef = useRef<Rendition | null>(null)

  // Путь к файлу в папке public
  const epubFile = '/epub/mwb_E_202411.epub'

  useEffect(() => {
    if (epubFile && bookRef.current) {
      const book = ePub(epubFile)

      const rendition = book.renderTo(bookRef.current, {
        width: '100%',
        height: '100%',
      })

      rendition
        .display('start') // Указание начальной главы
        .then(() => console.log('EPUB displayed successfully'))
        .catch((error) => console.error('Error rendering EPUB:', error))

      renditionRef.current = rendition
    }

    return () => {
      renditionRef.current?.destroy()
    }
  }, [epubFile])

  const nextPage = () => {
    renditionRef.current?.next()
  }

  const prevPage = () => {
    renditionRef.current?.prev()
  }

  return (
    <div>
      <div
        ref={bookRef}
        style={{ width: '100%', height: '500px', border: '1px solid black' }}
      />
      <button onClick={prevPage}>Previous Page</button>
      <button onClick={nextPage}>Next Page</button>
    </div>
  )
}

export default Epub
