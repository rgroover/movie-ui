import {ActorApi, MovieApi, TvShowApi} from "./api";
import { Configuration } from "./configuration";

// need to dynamically compute this based on if we're running local or hosted somewhere
const getApiUrl = () => {
    if (window.location.hostname.startsWith('localhost')) 
        return 'http://localhost:5002'
    else if (window.location.hostname.includes('groover.tech'))
        return 'https://api.groover.tech'
    else return '';
}

const URL =  getApiUrl();
const apiConfig = new Configuration({ basePath: URL });

export const actorApi = new ActorApi(apiConfig);
export const movieApi = new MovieApi(apiConfig);
export const tvShowApi = new TvShowApi(apiConfig);