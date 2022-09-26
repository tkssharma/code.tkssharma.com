import React from 'react'
import { Link } from '@reach/router'

import me from '../../content/thumbnails/main.png'

export const AboutSidebar = () => {
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>Me</h2>
        <img src={me} alt="Tarun Sharma" />
      </div>
      <div className="post-sidebar-card">
        <h5>Trainer</h5>
        <h5>Developer</h5>
        <h5>IT Consultant/Freelancer</h5>
      </div>
    </aside>
  )
}
