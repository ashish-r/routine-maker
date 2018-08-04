import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'

function Home() {
  return (
    <Grid container spacing={24} />
  )
}

Home.propTypes = {}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(Home)
