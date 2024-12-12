import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";
import { useCallback } from "react";

function ScrollToTopFab() {

    const trigger = useScrollTrigger({threshold: 200})

    const scrollToTop = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])

    return (
        <Zoom in={trigger}>
            <Box role='presentation'
                sx={{
                    position:'fixed',
                    bottom: 16,
                    right: 16, 
                    zIndex: 1
            }}>
                <Fab onClick={scrollToTop} 
                    size='small' 
                    aria-label="Scroll back to top"
                    sx={{backgroundColor: 'lightgray', color: 'black'}}
                >
                    <KeyboardArrowUp fontSize='small' />
                </Fab>
            </Box>
        </Zoom>

    )
}

export default ScrollToTopFab