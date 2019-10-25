import React from 'react';
import moment from 'moment';
import config from './Config';
import Swal from 'sweetalert2'
import { getEvents } from './GraphService';
import RequestDialog from './components/calendar/RequestDialog';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Fab,
} from '@material-ui/core';

function formatDateTime(dateTime) {
  return moment.utc(dateTime).local().format('M/D/YY h:mm A');
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true
})

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      optOpen: true,
      reqOpen: true,
      value: [],
      background: ['#280e3a', '#fff', '#fff', '#fff'],
      color: ['#fff', '#000', '#000', '#000'],
      age: 0,
    };
  }

  handleOpen = () => {
    console.log('It was ' + this.state.reqOpen);
    this.setState({ reqOpen: true });
    this.setState({ optOpen: false });
    console.log('Not it is ' + this.state.reqOpen);
  }

  handleClose = () => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'PROCEED',
      cancelButtonText: 'CANCEL',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your progress has not been saved!',
          'error'
        )
        this.setState({ reqOpen: false });
        this.setState({ optOpen: false });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.setState({ reqOpen: true });
        this.setState({ optOpen: false });
      }
    })
    this.setState({ reqOpen: false });
    this.setState({ optOpen: false });
  }

  handleNext = () => {
    this.setState({ reqOpen: false });
    this.setState({ optOpen: true });
  }

  // handleChange = (event) => {
  //   this.setState({ value: event.target.value });
  // }

  // requestDialog = (
  //   <RequestDialog {...this.props}></RequestDialog>
  // );

  async componentDidMount() {
    try {
      // Get the user's access token
      var accessToken = await window.msal.acquireTokenSilent({
        scopes: config.scopes
      });
      // Get the user's events
      var events = await getEvents(accessToken);
      // Update the array of events in state
      this.setState({ events: events.value });
    }
    catch (err) {
      this.props.showError('ERROR', JSON.stringify(err));
    }
  }

  render() {
    return (
      <div>
        <h1>Calendar</h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell scope="col">Organizer</TableCell>
                <TableCell scope="col">Subject</TableCell>
                <TableCell scope="col">Start</TableCell>
                <TableCell scope="col">End</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.events.map(
                function (event) {
                  return (
                    <TableRow key={event.id}>
                      <TableCell>{event.organizer.emailAddress.name}</TableCell>
                      <TableCell>{event.subject}</TableCell>
                      <TableCell>{formatDateTime(event.start.dateTime)}</TableCell>
                      <TableCell>{formatDateTime(event.end.dateTime)}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: 'fixed', right: '30px', bottom: '30px' }}
          onClick={this.handleOpen}
        >
          <i className="fas fa-plus"></i>
        </Fab>
        {this.state.reqOpen &&
          <RequestDialog
            handleNext={this.handleNext}
            handleClose={this.handleClose}
            handleChange={this.handleChange}
            {...this.state}
          ></RequestDialog>
        }
      </div>
    );
  }
}
