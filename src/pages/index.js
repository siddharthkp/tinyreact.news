import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

function BlogIndex(props) {
  const { data } = props

  const siteTitle = data.site.siteMetadata.title
  const latestPost = data.allMarkdownRemark.edges[0]

  function onSubmit() {
    window.open("https://buttondown.email/tinyreact", "popupwindow")
    if (window.fathom) window.fathom.trackGoal("OQAWQENM", 0)
  }

  const subscribed = props.location.search.includes("s=1")

  return subscribed ? (
    <Layout location={props.location} title={"Your subscription is confirmed."}>
      <h3>
        Sent the <Link to={latestPost.node.fields.slug}>latest issue</Link> to
        your inbox.
      </h3>
    </Layout>
  ) : (
    <Layout location={props.location} title={siteTitle}>
      <SEO />
      <h3>Short and sweet. No spam.</h3>
      <form
        action="https://buttondown.email/api/emails/embed-subscribe/tinyreact"
        method="post"
        target="popupwindow"
        onSubmit={onSubmit}
        className="embeddable-buttondown-form"
      >
        <label className="left-buffer" htmlFor="bd-email">
          Join 3110 React developers, enter your email
        </label>
        <input
          type="email"
          name="email"
          id="bd-email"
          placeholder="Your email (you@example.com)"
        />
        <input type="hidden" value="1" name="embed" />
        <input type="submit" value="Subscribe" />
      </form>
      <Link to={latestPost.node.fields.slug}>Read latest issue</Link>
      <br />
      <br />
      <Link to="/sponsor">Sponsor</Link>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
