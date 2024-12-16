import {Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {defaultImagePrefix} from "../../util/constants.ts";
import {Ad, Buy, Flatrate, Rent} from "../../api-client";
import {accordionStyle} from "../../styles/SharedStyles.ts";

interface WatchGuideProps {
    flatRate: Array<Flatrate> | null | undefined,
    ads: Array<Ad> | null | undefined,
    rent: Array<Rent> | null | undefined,
    buy: Array<Buy> | null | undefined
}
const WatchGuide: React.FC<WatchGuideProps> =
    ( {flatRate, ads, rent, buy}) => {

    return (
        <Box sx={{ flexGrow: 1 }} paddingTop={4}>
            <Accordion sx={{...accordionStyle }} >
                <AccordionSummary expandIcon={<ExpandMoreIcon  sx={{ color: 'white'}} />} id='panel1-header' aria-controls='panel1-content' >
                    <Typography variant="h6">Watch Guide</Typography>
                </AccordionSummary>
                <Divider sx={{ borderColor: 'white', width: '100%' }}  />
                <AccordionDetails>
                    <Typography mb={1} variant="h6">Subscription</Typography>
                    {!flatRate && <Typography mb={1}>None</Typography>}
                    {flatRate?.map( (provider) => {
                        return (
                            <Box
                                component="img"
                                sx={{height: 50, backgroundColor: 'white', borderRadius: '5px'}}
                                m={1}
                                alt="network image"
                                src={provider?.logoPath ? defaultImagePrefix + provider?.logoPath : '/no-image.jpg'}
                            />
                        )
                    })}
                    <Typography mb={1} variant="h6" mt={2}>Free (Ad supported)</Typography>
                    {!ads && <Typography mb={1}>None</Typography>}
                    {ads?.map( (provider) => {
                        return (
                            <Box
                                component="img"
                                sx={{height: 50, backgroundColor: 'white', borderRadius: '5px'}}
                                m={1}
                                alt="network image"
                                src={provider?.logoPath ? defaultImagePrefix + provider?.logoPath : '/no-image.jpg'}
                            />
                        )
                    })}
                    <Typography mb={1} variant="h6" mt={2}>Rent</Typography>
                    {!rent&& <Typography mb={1}>None</Typography>}
                    {rent?.map( (provider) => {
                        return (
                            <Box
                                component="img"
                                sx={{height: 50, backgroundColor: 'white', borderRadius: '5px'}}
                                m={1}
                                alt="network image"
                                src={provider?.logoPath ? defaultImagePrefix + provider?.logoPath : '/no-image.jpg'}
                            />
                        )
                    })}
                    <Typography  mb={1} variant="h6" mt={2}>Buy</Typography>
                    {!buy&& <Typography mb={1}>None</Typography>}
                    {buy?.map( (provider) => {
                        return (
                            <Box
                                component="img"
                                sx={{height: 50, backgroundColor: 'white', borderRadius: '5px'}}
                                m={1}
                                alt="network image"
                                src={provider?.logoPath ? defaultImagePrefix + provider?.logoPath : '/no-image.jpg'}
                            />
                        )
                    })}
                    <Divider sx={{ borderColor: 'white', width: '100%', marginTop: '20px' }}  />
                    <Typography fontSize={12} mt={2} >Streaming information courtesy of JustWatch</Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )

}

export default WatchGuide;
