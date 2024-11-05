import { Box, Grid2, Link, List, ListItem, Stack, Typography } from "@mui/material";

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
                <Grid2 size={{ xs: 12, md: 4 }}>
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
                            alignItems: 'center'     // Centers vertically
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
                                <Typography>Hello, my name is Russell Groover and I wrote this app as a POC to show potential employers that I am competent with React and to
                                    have an interesting conversation topic during interviews
                                </Typography>
                            </ListItem>
                            <ListItem >
                                <Link target='_blank' href="https://www.linkedin.com/in/russell-groover-1312817/" underline="hover">
                                    <Typography variant="body1" color="primary">My LinkedIn</Typography>
                                </Link>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>The IMDB website has become bloated and hard to navigate so I thought it would be
                                    fun to write a lightweight IMBD clone that performed a similar (albeit less feature rich)
                                    experience where you can easily find movies, tv shows, and actors
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>The frontend React app is an Azure Static Website, the backend is a dotnet core Azure App Service.
                                    The source code is hosted on Github in two separate repos and both the frontend and backend are automatically built and deployed
                                    upon checkin / merge to the main branch by using Github actions
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>This app uses a dotnet 8 web api backend that brokers queries to the TMDB API (free tier). 
                                    You'll need to sign up for an API key if you want to run this locally and you can get one
                                    by signing up here:</Typography>
                            </ListItem>
                            <ListItem >
                                <Link target='_blank' href="https://developer.themoviedb.org/docs/faq" underline="hover">
                                    <Typography variant="body1" color="primary">TMDB -The Movie DB</Typography>
                                </Link>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>I made a point of making the UI responsive so renders well on both desktop and mobile browsers</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>99% of what you see is json data that is returned from the TMDB API via brokering through a dotnet Web API.
                                    View Models are used to map the API response into what the React app consumes. 
                                    Strongly typed Typescript view models and axios API calls are generated using the openapi-generator cli.
                                    The site "Json to C#" is used to generate C# view models based on what the TMDB API returns</Typography>
                            </ListItem>
                            <ListItem >
                                <Link target='_blank' href="https://openapi-generator.tech/docs/generators/typescript-axios" underline="hover">
                                    <Typography variant="body1" color="primary">OpenAPI Axios Generator</Typography>
                                </Link>
                            </ListItem>
                            <ListItem >
                                <Link target='_blank' href="https://json2csharp.com/" underline="hover">
                                    <Typography variant="body1" color="primary">Json to C#</Typography>
                                </Link>
                            </ListItem>
                            <ListItem >
                                <Typography variant='h5'>Limitations / Future State</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>The TMDB API supports paging but I just return the first page in most cases, paging might be implemented in the future</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Authentication and Authorization with JWT will be my next goal. I intend to allow the user to login and save movies, tv shows, and actors as "favorites"</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Required Attribution: "This product uses the TMDB API but is not endorsed or certified by TMDB"</Typography>
                            </ListItem>
                        </List>
                    </Stack> 
                </Grid2>
            </Grid2>
        </Box>
      );
  }
  
  export default About