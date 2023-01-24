import React from 'react'
import { Container } from './styled'

export default function Footer() {
  return (
    <Container>
      <p>
        Built with <span className="heart-entity">&#10084;</span> by{' '}
        <a
          href="https://beacons.ai/elisa_amaral"
          target="_blank"
          rel="noreferrer"
        >
          Elisa Amaral
        </a>
      </p>
    </Container>
  )
}
