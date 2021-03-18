import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Header from '../components/Header'
import ContentModules from '../content-modules'
import Sidebar from '../sidebar'
import styled from 'styled-components'

const ResumePage = ({ data }) => {
  const { mainContent, sidebar } = data.allContentfulResume.edges[0].node

  const ModuleStyles = styled.section`
    grid-column-gap: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (min-width: 1100px) {
      grid-template-columns: 2fr 1fr;
    }

    .headline {
      border-bottom: 3px solid #000;
      text-transform: uppercase;
      font-weight: bold;
    }

    .mainContent {
      order: 2;
      @media (min-width: 1100px) {
        order: 1;
      }
    }

    .sidebar {
      order: 2;
      @media (min-width: 1100px) {
        order: 1;
      }
    }
  `

  return (
    <Layout>
      <Header header={data.allContentfulResume.edges[0].node} />
      <ModuleStyles className="modules">
        <main className="module mainContent">
          <h3 className="headline">Experience</h3>
          {mainContent && <ContentModules mainContent={mainContent} />}
        </main>
        <aside className="module sidebar">
          {sidebar && <Sidebar sidebar={sidebar} />}
        </aside>
      </ModuleStyles>
    </Layout>
  )
}

export default ResumePage

export const query = graphql`
  query pageQuery {
    allContentfulResume(filter: { slug: { eq: "david-riches" } }) {
      edges {
        node {
          title
          id
          slug
          introText
          location
          phone
          email
          website
          image {
            fluid(maxWidth: 150, maxHeight: 150) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          mainContent {
            __typename
            ... on ContentfulJob {
              title
              company
              date(formatString: "MM/YYYY")
              to(formatString: "MM/YYYY")
              summary {
                raw
              }
            }
            ... on ContentfulEducation {
              title
              university
              to(formatString: "MM/YYYY")
              end(formatString: "MM/YYYY")
            }
          }
          sidebar {
            __typename
            ... on ContentfulSummary {
              title
              body {
                raw
              }
            }
            ... on ContentfulSkills {
              title
              skill
            }
            ... on ContentfulCertification {
              title
              items {
                id
                title
                year
                link
                type
              }
            }
          }
        }
      }
    }
  }
`
