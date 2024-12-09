import { SxProps, Theme } from '@mui/material/styles';

export const accordionStyle: SxProps<Theme> = {
    backgroundColor: '#585858',  // Gray background
    border: '1px solid white',   // White border
    borderRadius: 2,             // Rounded corners
    overflow: 'hidden',          // Ensures the border radius applies properly
    color: 'white',              // Text color
};

export const searchButtonStyle: SxProps<Theme> = {
    border: '2px solid', // outline
    borderColor: 'white', // outline color
    '&.Mui-selected': {
        backgroundColor: '#ffd800', // custom background when selected
        color: 'black', // custom text color when selected
    },
    '&.Mui-selected:hover': {
        backgroundColor: '#ffd800', // custom background when selected and hovered
    }
}