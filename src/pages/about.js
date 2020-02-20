import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaCheckCircle } from "react-icons/fa"
import "./index.css"

import Sidebar from "../components/sidebar/Sidebar"
import TechTag from "../components/tags/TechTag"

const AboutPage = props => {
  const labels = props.data.site.siteMetadata.labels
  const aboutTags = ["react", "nodejs", "html", "css"]
  const tags = {}
  labels.forEach(label => {
    aboutTags.forEach(tag => {
      if (tag === label.tag) {
        tags[tag] = label.name
      }
    })
  })

  return (
    <Layout>
      <SEO title="About" />
      <div className="post-page-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>

        <div className="post-main">
          <SEO title="About" />
          <div className="mt-3">
            <h2 className="heading">About</h2>
            <p>
              <i>
                Interview Diary is a simple Blog platform where i will be
                posting top Interview Coding questions in Javascript
              </i>
            </p>
            <br />
            <h4>Features</h4>
            <div>
              <span className="text-success d-inline-block" title="tags">
                <FaCheckCircle size={26} style={{ color: "success" }} />
              </span>
              <p className="d-inline-block ml-3 w-75 align-top">
                Tech tags designed for web developers
              </p>
              <div className="ml-5">
                <TechTag
                  tag="react"
                  tech="React"
                  name={tags["react"]}
                  size={20}
                  color="deepskyblue"
                />
                <TechTag
                  tag="nodejs"
                  tech="Node.js"
                  name={tags["nodejs"]}
                  size={20}
                  color="lightgreen"
                />
                <TechTag
                  tag="html"
                  tech="HTML"
                  name={tags["html"]}
                  size={20}
                  color="darkorange"
                />
                <TechTag
                  tag="css"
                  tech="CSS"
                  name={tags["css"]}
                  size={20}
                  color="teal"
                />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-success d-inline-block" title="prism">
                <FaCheckCircle size={26} style={{ color: "success" }} />
              </span>
              <p className="d-inline-block ml-3 w-75 align-top">
                10 Min coding problem
              </p>
            </div>
            <div>
              <span className="text-success d-inline-block" title="icons">
                <FaCheckCircle size={26} style={{ color: "success" }} />
              </span>
              <p className="d-inline-block ml-3 w-75 align-top">
                Developer-relevant questions on React/Node/Angular
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query aboutQuery {
    site {
      siteMetadata {
        labels {
          tag
          tech
          name
          size
          color
        }
      }
    }
  }
`

export default AboutPage
