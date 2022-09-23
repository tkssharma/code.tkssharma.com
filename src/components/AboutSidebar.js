import React from 'react'
import { Link } from '@reach/router'

import me from '../../content/thumbnails/me.png'

export const AboutSidebar = () => {
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>Me</h2>
        <img src={me} alt="Tarun Sharma" />
      </div>
      <div className="post-sidebar-card">
        <h2></h2>
      </div>
    </aside>
  )
}
