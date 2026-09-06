import {Box, Button, Chip, Container, Divider, Grid2, Link, Paper, Stack, Typography} from '@mui/material';
import {ArrowForward, Code, FavoriteBorder, GitHub, LinkedIn, LiveTv, Search} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';

const features = [
    {
        icon: Search,
        title: 'Find your next watch',
        description: 'Discover movies and TV shows, explore trending titles, and search for the actors behind them.',
    },
    {
        icon: LiveTv,
        title: 'Know where to watch',
        description: 'The Watch Guide brings subscription, ad-supported, rental, and purchase options into the title details.',
    },
    {
        icon: FavoriteBorder,
        title: 'Keep your favorites close',
        description: 'Sign in to save favorites to your account and return to the movies and shows that caught your eye.',
    },
];

const engineering = [
    {
        title: 'A typed contract between client and API',
        description: 'The C# API maps TMDB responses into dedicated view models. OpenAPI generates the TypeScript models and Axios client, keeping the frontend aligned with the backend contract.',
        tags: ['C# / .NET 10', 'OpenAPI', 'TypeScript'],
    },
    {
        title: 'Thoughtful data and image loading',
        description: 'Paginated results and infinite scrolling load more content as you browse. Images load near the viewport, while TanStack Query manages server data and refreshes favorites after changes.',
        tags: ['TanStack Query', 'Intersection Observer'],
    },
    {
        title: 'Personalization across the stack',
        description: 'Auth0 handles sign-in, authenticated API requests connect the browser to the backend, and Azure Cosmos DB stores favorites associated with each user.',
        tags: ['Auth0', 'Azure Cosmos DB'],
    },
    {
        title: 'From source control to deployment',
        description: 'Separate frontend and backend repositories use GitHub Actions to build and deploy to Azure Static Web Apps and App Service. Backend tests cover controller behavior and response mapping.',
        tags: ['Azure', 'GitHub Actions', 'xUnit'],
    },
];

const externalLinkProps = {target: '_blank', rel: 'noopener noreferrer'};
const panelSx = {p: {xs: 3, md: 4}, borderColor: 'divider', backgroundImage: 'none', borderRadius: 3};

function About() {
    return (
        <Container component="main" maxWidth="lg" sx={{py: {xs: 4, md: 7}}}>
            <Box component="section" aria-labelledby="about-title" sx={{mb: {xs: 5, md: 7}}}>
                <Typography variant="overline" color="primary" sx={{letterSpacing: 2, fontWeight: 700}}>
                    About the project
                </Typography>
                <Grid2 container spacing={{xs: 4, md: 6}} sx={{mt: 1}} alignItems="center">
                    <Grid2 size={{xs: 12, md: 8}}>
                        <Typography id="about-title" component="h1" sx={{fontSize: {xs: '2.5rem', md: '3.75rem'}, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1}}>
                            Less searching.<br />
                            <Box component="span" sx={{color: 'primary.main'}}>More watching.</Box>
                        </Typography>
                        <Typography sx={{mt: 3, fontSize: '1.125rem', lineHeight: 1.8, color: 'text.secondary', maxWidth: 640}}>
                            Streaming Search brings movie and TV discovery, cast details, and streaming
                            availability together in one place. I built it to make deciding what to watch
                            easier—and to put my full-stack engineering skills into practice.
                        </Typography>
                        <Button component={RouterLink} to="/discover" variant="contained" size="large" endIcon={<ArrowForward />} sx={{mt: 3}}>
                            Explore the app
                        </Button>
                    </Grid2>
                    <Grid2 size={{xs: 12, md: 4}}>
                        <Paper variant="outlined" sx={{...panelSx, borderTop: '3px solid', borderTopColor: 'primary.main'}}>
                            <Typography variant="overline" color="text.secondary" sx={{letterSpacing: 1.5}}>Meet the developer</Typography>
                            <Typography component="h2" variant="h5" sx={{mt: 1}}>Russell Groover</Typography>
                            <Typography color="primary" sx={{mt: 0.5}}>Full-stack development · React &amp; .NET</Typography>
                            <Typography color="text.secondary" sx={{my: 2, lineHeight: 1.7}}>
                                I built this project across the frontend, API, data storage, and cloud deployment.
                                I’m interested in opportunities where I can bring that end-to-end perspective to a team.
                            </Typography>
                            <Stack spacing={1.5}>
                                <Button href="https://www.linkedin.com/in/russell-groover-1312817/" {...externalLinkProps} variant="contained" startIcon={<LinkedIn />}>
                                    Connect on LinkedIn
                                </Button>
                                <Button href="https://github.com/rgroover" {...externalLinkProps} variant="outlined" startIcon={<GitHub />}>
                                    View GitHub profile
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid2>
                </Grid2>
            </Box>

            <Box component="section" aria-labelledby="features-title" sx={{mb: {xs: 5, md: 7}}}>
                <Typography id="features-title" component="h2" variant="h4" sx={{mb: 3}}>Built around the next thing you’ll watch</Typography>
                <Grid2 container spacing={2}>
                    {features.map(({icon: Icon, title, description}) => (
                        <Grid2 key={title} size={{xs: 12, md: 4}}>
                            <Paper variant="outlined" sx={{...panelSx, height: '100%', boxSizing: 'border-box'}}>
                                <Icon sx={{color: 'primary.main', fontSize: 30, mb: 2}} />
                                <Typography component="h3" variant="h6" sx={{mb: 1}}>{title}</Typography>
                                <Typography color="text.secondary" sx={{lineHeight: 1.7}}>{description}</Typography>
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>

            <Box component="section" aria-labelledby="engineering-title" sx={{mb: {xs: 5, md: 7}}}>
                <Typography variant="overline" color="primary" sx={{letterSpacing: 2, fontWeight: 700}}>Behind the experience</Typography>
                <Typography id="engineering-title" component="h2" variant="h4" sx={{mt: 1}}>Engineering you can explore</Typography>
                <Typography color="text.secondary" sx={{mt: 2, mb: 3, maxWidth: 720, lineHeight: 1.7}}>
                    This is a working portfolio project, with a React and Material UI frontend backed by an
                    ASP.NET Core API. These are a few of the implementation decisions you’ll find in the source.
                </Typography>
                <Grid2 container spacing={2}>
                    {engineering.map(({title, description, tags}) => (
                        <Grid2 key={title} size={{xs: 12, md: 6}}>
                            <Paper variant="outlined" sx={{...panelSx, height: '100%', boxSizing: 'border-box'}}>
                                <Typography component="h3" variant="h6" sx={{mb: 1}}>{title}</Typography>
                                <Typography color="text.secondary" sx={{lineHeight: 1.7, mb: 2.5}}>{description}</Typography>
                                <Stack direction="row" useFlexGap flexWrap="wrap" gap={1}>
                                    {tags.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                                </Stack>
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>

            <Paper component="section" aria-labelledby="source-title" variant="outlined" sx={{...panelSx, mb: 5, background: 'linear-gradient(120deg, rgba(232,185,35,0.08), transparent)'}}>
                <Stack direction={{xs: 'column', md: 'row'}} spacing={3} alignItems={{xs: 'flex-start', md: 'center'}} justifyContent="space-between">
                    <Box sx={{maxWidth: 560}}>
                        <Typography id="source-title" component="h2" variant="h5">Take a closer look at the code</Typography>
                        <Typography color="text.secondary" sx={{mt: 1, lineHeight: 1.7}}>
                            Review the implementation in both repositories. If this work matches what your team
                            is building, I’d welcome a conversation on LinkedIn.
                        </Typography>
                    </Box>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={1.5} sx={{flexShrink: 0, width: {xs: '100%', sm: 'auto'}}}>
                        <Button href="https://github.com/rgroover/movie-ui" {...externalLinkProps} variant="outlined" startIcon={<Code />}>Frontend code</Button>
                        <Button href="https://github.com/rgroover/movie-svc" {...externalLinkProps} variant="outlined" startIcon={<Code />}>Backend code</Button>
                    </Stack>
                </Stack>
            </Paper>

            <Divider sx={{mb: 3}} />
            <Box component="footer">
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={3} alignItems={{xs: 'flex-start', sm: 'center'}}>
                    <Link href="https://www.themoviedb.org/" {...externalLinkProps} sx={{display: 'inline-flex', flexShrink: 0}}>
                        <Box component="img" src="/tmdb-logo.svg" alt="The Movie Database" sx={{width: 110, height: 'auto'}} />
                    </Link>
                    <Box>
                        <Typography variant="body2" color="text.secondary">This product uses the TMDB API but is not endorsed or certified by TMDB.</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                            Streaming information courtesy of <Link href="https://www.justwatch.com/" {...externalLinkProps}>JustWatch</Link> and TMDB.
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Container>
    );
}

export default About;
