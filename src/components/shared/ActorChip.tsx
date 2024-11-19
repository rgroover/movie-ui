import {Cast} from "../../api-client";
import {Avatar, Chip, Typography} from "@mui/material";
import {defaultImagePrefix} from "../../util/constants.ts";
import {useNavigate} from "react-router-dom";

export function ActorChip({ actor } : {actor: Cast}) {

    const navigate = useNavigate();

    const handleClick = (id: number | undefined) => {
        navigate(`/actor/${id}`);
    };

    // TV show actor results have an array of "roles", movies just have a single "character"
    const getCharacterName = (): string => {
        if (actor.roles && actor.roles![0].character?.length === 0) {
            return "(unknown)"
        } else if (actor.roles) {
            return actor.roles![0].character!
        } else if (actor.character?.length === 0) {
            return "(unknown)";
        } else if (actor.character) {
            return actor.character;
        }
        return "(unknown)";
    }

    return (
        <Chip id={`${actor.id}`}
              sx={{color: 'white', height: 80, backgroundColor: '#585858', '& .MuiChip-avatar': {
                      height: 70,
                      width: 70,
                  }}} variant="outlined"
              label={
                  <Typography variant="body2" sx={{ whiteSpace: 'normal', lineHeight: 2.0, pl:2 }}>
                      {getCharacterName()}
                        <br/>
                      {actor.name}
                  </Typography>}
              avatar={<Avatar alt={`${actor.name}`} src={`${defaultImagePrefix}${actor.profilePath}`}/>}
              onClick={() => handleClick(actor.id)}
              key={actor.id}
        />
    )
}