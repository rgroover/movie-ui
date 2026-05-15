import { SxProps, Theme } from '@mui/material/styles';

export const accordionStyle: SxProps<Theme> = {
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 2,
    overflow: 'hidden',
    color: 'inherit',
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