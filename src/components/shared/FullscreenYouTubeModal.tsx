import React from "react";
import {Box, Dialog, DialogContent, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import YouTube, { YouTubeEvent } from "react-youtube";

interface YouTubeModalProps {
    videoId: string; // The YouTube video ID
    open: boolean; // Control the modal visibility
    onClose: () => void; // Callback to close the modal
}

const FullscreenYouTubeModal: React.FC<YouTubeModalProps> = ({
                                                                 videoId,
                                                                 open,
                                                                 onClose,
                                                             }) => {

    const handleReady = (event: YouTubeEvent) => {
        event.target.playVideo();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            PaperProps={{
                sx: { backgroundColor: "black" },
            }}
        >
            <DialogContent
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    padding: 0,
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        color: "white",
                        zIndex: 1,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        "& iframe": {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        },
                    }}
                >
                    <YouTube
                        videoId={videoId}
                        opts={{
                            playerVars: {
                                autoplay: 1,
                                rel: 0,
                                modestbranding: 1,
                            },
                        }}
                        onReady={handleReady}
                    />
                </Box>
            </DialogContent>
        </Dialog>

    );
};

export default FullscreenYouTubeModal;
