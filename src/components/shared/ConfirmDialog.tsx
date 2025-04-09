// ConfirmDialog.tsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                         open,
                                                         title,
                                                         description,
                                                         confirmText = 'Yes',
                                                         cancelText = 'No',
                                                         onConfirm,
                                                         onCancel
                                                     }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="secondary">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="primary" variant="contained">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
