import {Box, Button, Grid2, List, ListItem, Stack, Typography} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";
import GitHubIcon from '@mui/icons-material/GitHub';

function About() {
    return (
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
            alignItems: 'center',     // Centers vertically
            p: 2
            }}
        >
            <Grid2 container>
                <Grid2 size={{ xs: 12, md: 2 }}>
                    <Stack direction='column' spacing={0}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centers horizontally
                            alignItems: 'center',     // Centers vertically
                            pb:2
                            }}>
                            <img src="react-logo.webp" alt="react logo" width={150} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centers horizontally
                            alignItems: 'center'     // Centers vertically
                            }}>
                            <img src="plus-symbol.png" alt="plus" width={35} height={35} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centers horizontally
                            alignItems: 'center'     // Centers vertically
                            }}>
                            <img src="csharp-logo.png" alt="TMDB logo" width={150} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centers horizontally
                            alignItems: 'center', // Centers vertically
                            }}>
                            <img src="plus-symbol.png" alt="plus" width={35} height={35} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centers horizontally
                            alignItems: 'center',    // Centers vertically
                            pt: 4
                            }}>
                            <img src="tmdb-logo.svg" alt="TMDB logo" width={150} />
                        </Box>
                    </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8}} paddingTop={2}>
                    <Stack direction='column'>
                        <List sx={{ listStyleType: 'disc', pl: 4 }}>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Hello, my name is Russell Groover and I wrote this app as a POC
                                    to show potential employers my proficiencies with React, Dotnet, Azure, architecture,
                                    DevOps, etc. The frontend and backend source code for this solution is
                                    available on my GitHub.
                                </Typography>
                            </ListItem>
                            <ListItem >
                                <Button
                                    href="https://www.linkedin.com/in/russell-groover-1312817/"
                                    target="_blank"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between', // Ensures text and image are at opposite ends
                                        alignItems: 'center',
                                        textTransform: 'none', // Keeps text casing as-is
                                        width: '180px',         // Adjust width to fit the content, or set a specific width
                                        padding: '4px 16px',   // Adds padding around text and image
                                    }}
                                >
                                    <Box component="span" fontWeight={"bold"} sx={{ mr: 1, pt: 0.5,width:85 }}>
                                        My LinkedIn
                                    </Box>
                                    <Box
                                        component="img"
                                        src="/linkedin.png"
                                        alt="icon"
                                        sx={{ width: 24, height: 24 }}
                                    />
                                    <OpenInNew sx={{ height: '24', pl: 1 }} />
                                </Button>
                            </ListItem>

                            <ListItem>
                                <Button
                                    href="https://github.com/rgroover"
                                    target="_blank"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        textTransform: 'none',
                                        width: '180px',
                                        padding: '4px 16px',
                                    }}
                                >
                                    <Box component="span" fontWeight="bold" sx={{ mr: 1, pt: 0.5, width:85 }}>
                                        My GitHub
                                    </Box>
                                    <GitHubIcon sx={{ width: 24, height: 24, mr: 1 }} />
                                    <OpenInNew sx={{ width: 24, height: 24 }} />
                                </Button>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>The IMDB website has become bloated and hard to navigate so I thought it would be
                                    fun to write a lightweight IMBD clone where you can easily find movies, tv shows, actors, and most importantly,
                                    to know where a TV Show or Movie are streaming. Many titles appear and disappear from streaming platforms at the
                                    start/end of the month. My "Watch Guide" functionality gives you quick info on where a TV Show or Movie is
                                    currently available.
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>The frontend React app is an Azure Static Website, the backend is a dotnet core Azure App Service.
                                    The source code is hosted on Github in two separate repos and both the frontend and backend are automatically
                                    built and deployed upon checkin / merge to the main branch via Github actions
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>This app uses a dotnet 8 web api backend that brokers queries to the TMDB API (free tier). 
                                    You'll need to sign up for an API key if you want to run this locally and you can get one
                                    by signing up here:</Typography>
                            </ListItem>
                            <ListItem >
                                <Button
                                    href="https://developer.themoviedb.org/docs/faq"
                                    target="_blank"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between', // Ensures text and image are at opposite ends
                                        alignItems: 'center',
                                        textTransform: 'none', // Keeps text casing as-is
                                        width: 'auto',         // Adjust width to fit the content, or set a specific width
                                        padding: '4px 16px',   // Adds padding around text and image
                                    }}
                                >
                                    <Box component="span" fontWeight={"bold"} sx={{ mr: 1 }}>
                                        TMDB -The Movie DB
                                    </Box>
                                    <OpenInNew sx={{ height: '24', pl: 0.5 }} />
                                </Button>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>I made a point of making the UI responsive so renders well on both desktop and mobile browsers</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Most of the information you see is json data that is returned from the TMDB API via brokering through a dotnet Web API.
                                    View Models are used to map the API response into what the React app consumes. 
                                    Strongly typed Typescript view models and axios API calls are generated using the openapi-generator cli.
                                    The site "Json to C#" is used to generate C# view models based on what the TMDB API returns</Typography>
                            </ListItem>
                            <ListItem >
                                <Button
                                    href="https://openapi-generator.tech/docs/generators/typescript-axios"
                                    target="_blank"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between', // Ensures text and image are at opposite ends
                                        alignItems: 'center',
                                        textTransform: 'none', // Keeps text casing as-is
                                        width: 'auto',         // Adjust width to fit the content, or set a specific width
                                        padding: '4px 16px',   // Adds padding around text and image
                                    }}
                                >
                                    <Box component="span" fontWeight={"bold"} sx={{ mr: 1 }}>
                                        OpenAPI Axios Generator
                                    </Box>
                                    <OpenInNew sx={{ height: '24', pl: 0.5 }} />
                                </Button>
                            </ListItem>
                            <ListItem >
                                <Button
                                    href="https://json2csharp.com/"
                                    target="_blank"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between', // Ensures text and image are at opposite ends
                                        alignItems: 'center',
                                        textTransform: 'none', // Keeps text casing as-is
                                        width: 'auto',         // Adjust width to fit the content, or set a specific width
                                        padding: '4px 16px',   // Adds padding around text and image
                                    }}
                                >
                                    <Box component="span" fontWeight={"bold"} sx={{ mr: 1 }}>
                                        Json to C#
                                    </Box>
                                    <OpenInNew sx={{ height: '24', pl: 0.5 }} />
                                </Button>
                            </ListItem>
                            <ListItem >
                                <Typography variant='h5'>More Technical Details</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>The TMDB API supports paging for many of its endpoints. On the main search page I use infinite scrolling to
                                    request the next page of results.</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>I'm using Auth0 for authentication for Favorites. I only use the email and user info for basic POC
                                    functionality for Favorites. If you want to exercise the saving of Favorites you'll need to setup an
                                    Auth0 account as well as setup Azure Cosmos DB as mentioned below</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Favorites information is stored in Azure Cosmos DB so it's tied to the authenticated user.
                                You'll need to setup a Cosmos DB in Azure if you want to exercise Favorites functionality.</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Lazy loading of images is used in any case where there could be a long list of media images. At one point I
                                    was getting a 429 because of eager fetching of all Actor, Movie, etc images. Now, lazy loading preserves bandwidth
                                    and only requests an image when it comes into view</Typography>
                            </ListItem>
                            <ListItem >
                                <Typography variant='h5'>Attribution</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>This product uses the TMDB API but is not endorsed or certified by TMDB</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Streaming information courtesy of JustWatch and TMDB</Typography>
                            </ListItem>
                        </List>
                    </Stack> 
                </Grid2>
            </Grid2>
        </Box>
      );
  }
  
  export default About