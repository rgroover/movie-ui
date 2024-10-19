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
                    <Stack direction='column' spacing={2}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centers horizontally
                            alignItems: 'center',     // Centers vertically
                            }}>
                            <img src="react-logo.webp" alt="react logo" width={200} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centers horizontally
                            alignItems: 'center',     // Centers vertically
                            }}>
                            <Typography variant="h1">+</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centers horizontally
                            alignItems: 'center',     // Centers vertically
                            p: 2
                            }}>
                            <img src="tmdb-logo.svg" alt="TMDB logo" width={200} />
                        </Box>
                    </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8}}>
                    <Stack direction='column'>
                        <List sx={{ listStyleType: 'disc', pl: 4 }}>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Required Attribution: "This product uses the TMDB API but is not endorsed or certified by TMDB"</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>I wrote this app as a POC to show potential employers that I am competent with React and to
                                    have a worthwhile conversation topic during interviews
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>The IMDB website has become so bloated and hard to navigate I thought it would be
                                    fun to write a lightweight IMBD clone that performed a similar (albeit less feature rich) experience
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
                                <Typography>I made a point of making the UI responsive so it works well on both desktop and mobile browsers</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>99% of what you see is what is returned from the TMDB API via brokering through a dotnet Web API. I do not store any data in a database or other storage mechanism. 
                                    View Models are used to map the API response into what the React app consumes. 
                                    Strongly typed view models and API calls are made using the openapi-generator cli. 
                                    The site "Json to C#" is used to generate C# view models based on what the TMDB API returns.</Typography>
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
                                <Typography>Currently you can only search for movies, TV show results are not supported. 
                                    The results model returned for TV shows was different from movies and it didn't seem like a worthwhile expenditure of time to get that working</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }}>
                                <Typography>Searching by actor would be nice enhancement that I may implement in the future</Typography>
                            </ListItem>
                        </List>
                    </Stack> 
                </Grid2>
            </Grid2>
        </Box>
      );
  }
  
  export default About