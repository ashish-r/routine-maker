import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import DaysTable from './DaysTable'
import CommonAreas from './CommonAreas'


const styles = theme => ({
  detailBox: {
    padding: theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 0.5,
  },
  detailTitle: {
    marginTop: theme.spacing.unit * 2,
  }
})

/**
 * Component to render Section SchoolDetails
 */
class SchoolDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const classes = this.props.classes
    const days = this.props.days
    const commonAreas = this.props.commonAreas
    const addCommonArea = this.props.addCommonArea

    return (<div>
      <Typography variant="caption">
        School Details
      </Typography>
      <Grid container className={classes.home}>
        <Grid item xs={6}>
          <Typography variant="subheading" className={classes.detailTitle}>
            School Working Days
          </Typography>
          <Paper className={classes.detailBox}>
            <DaysTable
              updateDays={this.props.updateDays}
              days={days}
            />
          </Paper>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Typography variant="subheading" className={classes.detailTitle}>
            Common Areas
          </Typography>
          <Paper className={classes.detailBox}>
            <CommonAreas
              commonAreas={commonAreas}
              addCommonArea={addCommonArea}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>)
  }
}

SchoolDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  updateDays: PropTypes.func.isRequired,
}

export default withStyles(styles)(SchoolDetails)
