import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Sections from './Sections'
import AddClassDialog from './Dialogs/AddClassDialog'
import ClassSidebar from './Components/ClassSidebar'
import AddTeacher from './Components/AddTeacher'
import ShowTeacher from './Components/ShowTeacher'

const styles = theme => ({
  home: {
    height: 'calc(100vh - 38px)',
    maxHeight: 'calc(100vh - 38px)',
    overflow: 'hidden',
  },
  details: {
    marginTop: `${theme.spacing.unit * 2}px`,
  },
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    const firstClass = this.getClassList()[0]
    this.state = {
      selectedClass: firstClass && firstClass.className,
      addClassDialogOpen: false,
      addSectionDialogOpen: false,
    }
  }

  /**
   * Get classes list in format: [{ name: '1' }]
   */
  getClassList = () => {
    const classes = this.props.classList
      .sort((a, b) => (a.className > b.className ? 1 : -1))
    return classes
  }

  /**
   * Get subjects list in format: [{ className: '1', section: 'A', subject: 'English' }]
   */
  getSubjects = () => {
    // Get sections for selected class only
    const selectedClass = this.state.selectedClass

    const subjects = this.props.subjects
      .filter(ob => (
        ob.className === selectedClass
      ))
    return subjects
  }

  /**
   * Get sections list in format: [{ className: '1', section: 'A' }]
   */
  getSections = () => {
    // Get sections for selected class only
    const selectedClass = this.state.selectedClass

    const sections = this.props.sections
      .filter(ob => ob.className === selectedClass)
    return sections
  }

  selectClass = (obj) => {
    console.log('selectClass', obj)
    this.setState({
      selectedClass: obj.className
    })
  }

  handleClassDialog = (val) => () => {
    this.setState({
      addClassDialogOpen: !!val
    })
  }

  addClass = ({
    className, sections = [], subjects = [], classSections = [], classSubjects = []
  }) => this.props.dispatch({
    type: 'ADD_CLASS',
    className,
    sections,
    subjects,
    classSections,
    classSubjects,
  })

  render() {
    console.log(this.props);
    const classes = this.props.classes

    const selectClass = this.selectClass

    const sections = this.getSections()
    const subjects = this.getSubjects()

    return (
      <Grid container spacing={16} className={classes.home}>
        <AddClassDialog
          open={this.state.addClassDialogOpen}
          onClose={this.handleClassDialog(false)}
          addClass={this.addClass}
          classList={this.getClassList()}
        />
        <Grid item xs={2} >
          <ClassSidebar
            activeClass={this.state.selectedClass}
            selectClass={selectClass}
            classesList={this.getClassList()}
            addClass={this.handleClassDialog(true)}
          />
        </Grid>
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={12} className={classes.details} >
              <Sections
                activeClass={this.state.selectedClass}
                sections={sections}
                subjects={subjects}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} >
          <AddTeacher/>
          <ShowTeacher teachers = {this.props.teachers}/>
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    details: PropTypes.string.isRequired,
  }).isRequired,
  classList: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
  })).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
  })).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Home))
