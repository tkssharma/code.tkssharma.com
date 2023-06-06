import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'

import favicon from '../assets/nav-floppy.png'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

import '../styles/style.css'
import '../styles/new-moon.css'

export const Layout = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  const onUpdateTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')

    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  return (
    <div>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
        {theme === 'dark' && (
          <link rel="stylesheet" type="text/css" href="/dark-mode.css" />
        )}
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4650067392768536"
          crossorigin="anonymous"></script>
      </Helmet>

      <div id="layout" className="layout">
        <Navigation onUpdateTheme={onUpdateTheme} theme={theme} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
