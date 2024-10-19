import { ActorApi, MovieApi } from "./api";
import { Configuration } from "./configuration";

// need to dynamically compute this based on if we're running local or hosted somewhere
const getApiUrl = () => {
    if (window.location.hostname.startsWith('localhost')) 
        return 'http://localhost:5000'
    else if (window.location.hostname.startsWith('groover')) 
        return 'TBD Azure URL for API'
    else return '';
}

const URL =  getApiUrl();
const apiConfig = new Configuration({ basePath: URL });

export const actorApi = new ActorApi(apiConfig);
export const movieApi = new MovieApi(apiConfig);
