import React, { useEffect, useState, useRef } from 'react'
import ePub, { Book, Rendition } from 'epubjs'

const Epub = () => {
  const bookRef = useRef<HTMLDivElement>(null)

  const renditionRef = useRef<Rendition | null>(null)

  //const [epubFile, setEpubFile] = useState<string | null>(null)
  // useEffect(() => {
  //   const fetchEpub = async () => {
  //     try {
  //       const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  //       const targetUrl =
  //         'https://download-a.akamaihd.net/files/media_periodical/52/mwb_E_202411.epub'
  //       const response = await fetch(proxyUrl + targetUrl)
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch EPUB file: ${response.statusText}`)
  //       }
  //       const blob = await response.blob()
  //       const url = URL.createObjectURL(blob)
  //       setEpubFile(url)
  //     } catch (error) {
  //       console.error('Error fetching the EPUB file:', error)
  //     }
  //   }

  //   fetchEpub()

  //   // Cleanup: revoke the object URL when the component is unmounted
  //   return () => {
  //     if (epubFile) {
  //       URL.revokeObjectURL(epubFile)
  //     }
  //   }
  // }, [])

  const epubFile = `tms-helper/src/Pages/Epub/mwb_E_202411.epub`

  console.log('EPUB file path:', epubFile)

  useEffect(() => {
    if (epubFile && bookRef.current) {
      const book: Book = ePub(epubFile)
      console.log('Book created:', book)
      const rendition: Rendition = book.renderTo(bookRef.current, {
        width: '100%',
        height: '100%',
      })
      console.log('Rendition created:', rendition)
      rendition
        .display()
        .then(() => console.log('EPUB displayed successfully'))
        .catch((error) => console.error('Error rendering EPUB:', error))

      renditionRef.current = rendition
    }

    return () => {
      if (renditionRef.current) {
        renditionRef.current.destroy()
      }
    }
  }, [])

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
