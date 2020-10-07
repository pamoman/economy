import React from 'react';
import TheatersIcon from '@material-ui/icons/Theaters';
import TvIcon from '@material-ui/icons/Tv';
import AppleIcon from '@material-ui/icons/Apple';
import SpeakerIcon from '@material-ui/icons/Speaker';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RoomIcon from '@material-ui/icons/Room';
import BuildIcon from '@material-ui/icons/Build';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

// Icon helper
const icon = {
    cat: {
        "OK": [
            <CheckCircleIcon className="check-icon" fontSize="large" color="disable" key="OK" />
        ],
        "Att göra": [
            <ErrorIcon fontSize="large" color="error" key="Broke" />
        ],
        "Projektor": [
            <TheatersIcon fontSize="large" key="Projektor" />
        ],
        "Högtalare": [
            <SpeakerIcon fontSize="large" key="Högtalare" />
        ],
        "TV": [
            <TvIcon fontSize="large" key="TV" />
        ],
        "Apple TV": [
            <AppleIcon fontSize="large" key="Apple TV" />
        ],
        "Skärm": [
            <TvIcon fontSize="large" key="Skärm" />
        ],
        "View": [
            <VisibilityIcon fontSize="large" key="View" />
        ],
        "Up": [
            <ArrowUpwardIcon fontSize="large" key="Up" />
        ],
        "Down": [
            <ArrowDownwardIcon fontSize="large" key="Down" />
        ],
        "Add": [
            <AddBoxIcon fontSize="large" key="Add" />
        ],
        "Edit": [
            <EditIcon fontSize="large" key="Edit" />
        ],
        "Delete": [
            <DeleteIcon fontSize="large" key="Delete" />
        ],
        "Swap": [
            <SwapVerticalCircleIcon fontSize="large" key="Swap" />
        ],
        "Building": [
            <HomeWorkIcon fontSize="large" key="Building" />
        ],
        "Alla": [
            <SelectAllIcon fontSize="large" key="Alla" />
        ],
        "Working": [
            <CheckCircleIcon className="check-icon" fontSize="large" color="disable" key="Working" />
        ],
        "Broke": [
            <ErrorIcon fontSize="large" color="error" key="Broke" />
        ],
        "Room": [
            <RoomIcon fontSize="large" key="Room" />
        ],
        "Classroom2": [
            <HomeWorkIcon fontSize="large" key="Classroom2" />
        ],
        "Build": [
            <BuildIcon fontSize="large" key="Build" />
        ],
        "Drop-down": [
            <ArrowDropDownIcon fontSize="large" key="Drop-down" />
        ],
        "Drop-up": [
            <ArrowDropUpIcon fontSize="large" key="Drop-up" />
        ],
        "Level": [
            <SupervisorAccountIcon fontSize="large" key="Level" />
        ],
    },
    get: function(name, callback = null, selected = null, toggleHover = null, tooltip = null) {
        let icon;
        let element;

        icon = this.cat[name];

        if (callback) {
            element = [
                <i
                    key={`icon-${name}`}
                    className={ selected ? "selected" : "clickable" }
                    onClick={ callback }
                    onMouseEnter={ toggleHover ? () => toggleHover(this.tooltip[tooltip][name]) : null }
                    onMouseLeave={ toggleHover ? () => toggleHover(null) : null }
                >
                { icon }
                </i>
            ]
        } else {
            element = [
                <i key={`icon-${name}`}>{ icon }</i>
            ]
        }

        return element;
    },
};

export default icon;
