import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import SectionCard from './Card'

const styles = theme => ({
  root: {
    display: 'flex-root',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
    margin: theme.spacing.unit,
    marginTop: 0
  },
})

/**
 * Component to render Classes & School's Chips
 */
class Sections extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const props = this.props
    const classes = props.classes
    const sections = this.props.sections
    const activeClass = this.props.activeClass

    if (!sections.length) {
      sections.push({
        section: 'None'
      })
    }

    return (
      <Grid container spacing={24} >
        <Grid item xs={12} >
          <Typography variant="subheading" gutterBottom>
              Sections
          </Typography>
        </Grid>
        <Grid item xs={12} >
            Active Class <br />
          {activeClass}<br />
          {sections.map(section => (
            <SectionCard
              key={`class@@section@card@@${activeClass + section}`}
              classes={classes}
              section={section}
              subjects={this.props.subjects[section.name] || [{
                subject: 'None'
              }]}
            />
          ))}
        </Grid>
      </Grid>
    )
  }
}

Sections.propTypes = {
  activeClass: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    section: PropTypes.string.isRequired,
  })).isRequired,
  subjects: PropTypes.objectOf(PropTypes.shape({})).isRequired,
}

export default withStyles(styles)(Sections)
