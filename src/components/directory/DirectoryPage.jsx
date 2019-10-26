import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

const styles = theme => ({
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
});

class DirectoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    const { classes } = this.props;

    function handleChange(e, value) {
      this.setState({ value: value });
    }

    function createData(name, job, username) {
      return { name, job, username };
    }

    const candidates = [
      createData('Chris Evans', 'University of British Columbia', 'c.evans@gmail.com'),
      createData('Robert Downey Jr.', 'Simon Fraser University', 'r.downey@gmail.com'),
      createData('Scarlet Johansen', 'British Columbia Institue of Technology', 's.johansen@gmail.com'),
      createData('Tom Holland', 'University of Waterloo', 't.holland@gmail.com'),
      createData('Benedict Cumberbatch', 'University of Victoria', 'b.cumberbatch@gmail.com'),
    ];

    const employees = [
      createData('Captain America', 'Senior Project Manager', 'c.america@galvanize.com'),
      createData('Iron man', 'UX Designer', 'i.man@galvanize.com'),
      createData('Black Widow', 'Junior Software Developer', 'b.widow@galvanize.com'),
      createData('Spider man', 'Business Analyst', 's.man@galvanize.com'),
      createData('Dr. Strange', 'Senior Project Owner', 'd.strange@galvanize.com'),
    ];

    function Directory(props) {
      const { label, rows } = props
      return <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{label} Name</TableCell>
              <TableCell>{label === 'Candidate' ? 'University Name' : 'Job Title'}</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.job}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell><Button variant="outlined">Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>;
    }

    return <div>
      <h1>Directory</h1>
      <Paper square>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange.bind(this)}
        >
          <Tab label="Candidate" />
          <Tab label="Employee" />
        </Tabs>
        <div hidden={this.state.value !== 0}><Directory label="Candidate" rows={candidates} /></div>
        <div hidden={this.state.value !== 1}><Directory label="Employee" rows={employees} /></div>
      </Paper>
    </div>;
  }
}

export default withStyles(styles)(DirectoryPage);
