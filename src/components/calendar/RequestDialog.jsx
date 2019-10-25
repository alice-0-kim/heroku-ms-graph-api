import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Fab,
    FormControl,
    Typography,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    Select,
    TextField,
} from '@material-ui/core';

const styles = theme => ({
    title: {
        fontDuration: 'normal',
        marginLeft: '30px',
    },
    flex: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    calendar: {
        // margin: '0 10px',
        height: '700px',
    },
    component: {
        width: 'calc(100% / 7)',
        color: '#fff',
        height: 'fit-content',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'inherit',
        },
    },
    label: {
        padding: '7.5px 0',
        backgroundColor: '#280e3a',
        margin: '0',
    },
    bar: {
        width: '5px',
        height: '84px',
        backgroundColor: '#e91e63',
        borderRadius: '15px',
    },
    detail: {
        color: '#000',
        fontSize: '12px',
        textAlign: 'left',
        lineHeight: '1',
        marginLeft: '10px',
    },
    event: {
        display: 'flex',
    },
    header: {
        justifyContent: 'space-between',
    },
    button: {
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '16px',
        outline: 'none',
        [theme.breakpoints.down('sm')]: {
            margin: 'auto',
        },
    },
    icon: {
        margin: 'auto',
    },
    iconLabel: {
        marginLeft: '10px',
        marginRight: '30px',
    },
    duration: {
        padding: '5px 30px',
        borderColor: '#765ea8',
    }
});

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

class RequestDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            optOpen: true,
            reqOpen: true,
            // value: ['female'],
            background: ['#280e3a', '#fff', '#fff', '#fff'],
            color: ['#fff', '#000', '#000', '#000'],
            // personName: [""],
            age: 0,
        };
    }

    handleOpen() {
        this.setState({ reqOpen: true });
    }

    handleClose() {
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

    handleSave() {
        this.setState({ reqOpen: false });
        this.setState({ optOpen: false });
    }

    // handleNext() {
    //     this.setState({ reqOpen: false });
    //     this.setState({ optOpen: true });
    // }

    handleBack() {
        this.setState({ reqOpen: true });
        this.setState({ optOpen: false });
    }

    handleDelete() {

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSelect(selected) {
        const { background, color } = this.state;

        for (let i = 0; i < 4; i++)
            if (i === selected) {
                background[i] = '#280e3a';
                color[i] = '#fff';
            }
            else {
                background[i] = '#fff';
                color[i] = '#280e3a';
            }

        this.setState({ background: background });
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog open={this.state.reqOpen} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Schedule Interview</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To schedule a new interview, provide a candidate and a list of interviewers to request a list of options.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="candidate"
                        label="Candidate"
                        type="email"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                        <Select
                            multiple
                            value={[]}
                            onChange={this.handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map(name => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="optional-interviewers"
                        label="Optional Interviewer(s)"
                        type="text"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PeopleIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                    <div style={{ margin: '5px 5px 10px' }}>
                        <span style={{ color: 'rgba(0, 0, 0, 0.54)', margin: 'auto 10px', fontSize: 'small' }}>CC to:</span>
                        <Chip
                            avatar={<Avatar style={{ backgroundColor: '#fc036f', color: '#fff' }}>AW</Avatar>}
                            label="Alice Wang"
                            onDelete={this.handleDelete}
                            deleteIcon={<HighlightOffRoundedIcon />}
                            style={{ backgroundColor: '#fff' }}
                        />
                        <Chip
                            avatar={<Avatar style={{ backgroundColor: '#033dfc', color: '#fff' }}>DK</Avatar>}
                            label="David Kennedy"
                            onDelete={this.handleDelete}
                            deleteIcon={<HighlightOffRoundedIcon />}
                            style={{ backgroundColor: '#fff' }}
                        />
                        <Chip
                            avatar={<Avatar style={{ backgroundColor: '#fcba03', color: '#fff' }}>JS</Avatar>}
                            label="Jason Song"
                            onDelete={this.handleDelete}
                            deleteIcon={<HighlightOffRoundedIcon />}
                            style={{ backgroundColor: '#fff' }}
                        />
                    </div>
                    <Grid item>
                        <ButtonGroup fullWidth size="small" aria-label="small outlined button group">
                            <Button
                                className={classes.duration}
                                style={{
                                    background: this.state.background[0],
                                    color: this.state.color[0]
                                }}
                                onClick={this.handleSelect.bind(this, 0)}>
                                30 min
                            </Button>
                            <Button
                                className={classes.duration}
                                style={{
                                    background: this.state.background[1],
                                    color: this.state.color[1]
                                }}
                                onClick={this.handleSelect.bind(this, 1)}>
                                45 min
                            </Button>
                            <Button
                                className={classes.duration}
                                style={{
                                    background: this.state.background[2],
                                    color: this.state.color[2]
                                }}
                                onClick={this.handleSelect.bind(this, 2)}>
                                60 min
                            </Button>
                            <Button
                                className={classes.duration}
                                style={{
                                    background: this.state.background[3],
                                    color: this.state.color[3]
                                }}
                                onClick={this.handleSelect.bind(this, 3)}>
                                90 min
                        </Button>
                        </ButtonGroup>
                    </Grid>
                    <TextField
                        id="filled-full-width"
                        label="Additional comments"
                        placeholder="Enter additional comments"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.handleNext.bind(this)} color="primary">
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(RequestDialog);
