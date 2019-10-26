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
    FormControl,
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
    Select,
    TextField,
} from '@material-ui/core';

const styles = theme => ({
    duration: {
        padding: '5px 30px',
        borderColor: '#765ea8',
    },
    chip: {
        marginRight: '5px',
    }
});

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

class RequestDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // value: props.value,
            background: props.background,
            color: props.color,
            required: props.required,
            optional: props.optional,
            // optOpen: true,
            // reqOpen: true,
            // value: [],
            // background: ['#280e3a', '#fff', '#fff', '#fff'],
            // color: ['#fff', '#000', '#000', '#000'],
            // // personName: [""],
            // age: 0,
        };

        console.log(this.state)
    }

    updateRequiredInterviewers = (event) => {
        this.setState({ required: event.target.value });
    }

    updateOptionalInterviewers = (event) => {
        this.setState({ optional: event.target.value });
    }

    // handleSave() {
    //     this.setState({ reqOpen: false });
    //     this.setState({ optOpen: false });
    // }

    // handleBack() {
    //     this.setState({ reqOpen: true });
    //     this.setState({ optOpen: false });
    // }

    // handleDelete() {

    // }

    // handleChange = (event) => {
    //     this.setState({ value: event.target.value });
    // }

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
            <Dialog open={true} aria-labelledby="form-dialog-title">
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
                    <FormControl
                        fullWidth
                        variant="outlined">
                        <InputLabel
                            htmlFor="select-multiple-chip"
                            style={{ fontSize: '12px', lineHeight: '30px' }}>
                            Required Interviewer(s)</InputLabel>
                        <Select
                            multiple
                            value={this.state.required}
                            onChange={this.updateRequiredInterviewers}
                            input={<Input id="select-multiple-chip" disableUnderline={true} />}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            className={classes.chip}
                                            avatar={<Avatar style={{ backgroundColor: 'darkslateblue', color: '#fff', fontSize: 'xx-small' }}>AW</Avatar>} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.25)',
                                borderRadius: '5px',
                                paddingTop: '5px',
                            }}
                        >
                            {names.map(name => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        variant="outlined">
                        <InputLabel
                            htmlFor="select-multiple-chip"
                            style={{ fontSize: '12px', lineHeight: '30px' }}>
                            Optional Interviewer(s)</InputLabel>
                        <Select
                            multiple
                            value={this.state.optional}
                            onChange={this.updateOptionalInterviewers}
                            input={<Input id="select-multiple-chip" disableUnderline={true} />}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            className={classes.chip}
                                            avatar={<Avatar style={{ backgroundColor: 'darkslateblue', color: '#fff', fontSize: 'xx-small' }}>AW</Avatar>} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.25)',
                                borderRadius: '5px',
                                paddingTop: '5px',
                            }}
                        >
                            {names.map(name => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div style={{ margin: '5px 5px 10px' }}>
                        <span style={{ color: 'rgba(0, 0, 0, 0.54)', margin: 'auto 10px', fontSize: 'small' }}>CC to:</span>
                        <Chip
                            avatar={<Avatar style={{ backgroundColor: 'deeppink', color: '#fff', fontSize: 'xx-small' }}>AW</Avatar>}
                            label="Alice Wang"
                            onDelete={this.handleDelete}
                            deleteIcon={<HighlightOffRoundedIcon />}
                            className={classes.chip}
                        />
                        <Chip
                            avatar={<Avatar style={{ backgroundColor: 'darkslateblue', color: '#fff', fontSize: 'xx-small' }}>DK</Avatar>}
                            label="David Kennedy"
                            onDelete={this.handleDelete}
                            deleteIcon={<HighlightOffRoundedIcon />}
                            className={classes.chip}
                        />
                        <Chip
                            avatar={<Avatar style={{ backgroundColor: 'darkorange', color: '#fff', fontSize: 'xx-small' }}>JS</Avatar>}
                            label="Jason Song"
                            onDelete={this.handleDelete}
                            deleteIcon={<HighlightOffRoundedIcon />}
                            className={classes.chip}
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
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.handleNext.bind(this)} color="primary">
                        Next
                    </Button>
                </DialogActions>
            </Dialog >
        );
    }
}

export default withStyles(styles)(RequestDialog);
