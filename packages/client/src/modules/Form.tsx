import * as React from 'react'
import styled from 'styled-components'

import { Input, Button } from '../components'

const MonoInput = styled(Input)({
  fontFamily: 'monospace',
})

interface State {
  query: string
}

interface Props {
  initialQuery?: string
  isLoading: boolean
  onSubmit: (query: string) => void
}

export default class Search extends React.Component<Props, State> {
  state = {
    query: this.props.initialQuery || '',
  }

  onChange = (e: { target: HTMLInputElement }) => {
    this.setState({ query: e.target.value })
  }

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    this.props.onSubmit(this.state.query)
  }

  render() {
    const { query } = this.state
    const { isLoading } = this.props

    const noSubmit = isLoading || query === ''

    return (
      <form>
        <MonoInput
          value={query}
          onChange={this.onChange}
          disabled={isLoading}
        />
        <Button onClick={this.onSubmit} disabled={noSubmit}>
          Search
        </Button>
      </form>
    )
  }
}
