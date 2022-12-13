import axios from "axios";
import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";

function Playlists() {
    const playlistsLocal = [
        {
            id: 1,
            name: "Playlist 1"
        },
        {
            id: 2,
            name: "Playlist 2"
        },
        {
            id: 3,
            name: "Playlist 3"
        },
        {
            id: 4,
            name: "Playlist 4"
        },
    ]
    const [playlists, setPlaylists] = useState([])

    const url = 'https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists';
   
    const config = { headers: { Authorization: "david-alves-barbosa" } };

    // pegar todas as playlist  Exercicio 2. 
    const getAllPlaylist = () => {
        axios.get(url, config)
            .then((response) => {
                setPlaylists(response.data.result.list);
            })
            .catch((error) => {
                alert(error);
            })
    }
    useEffect(() => {
        getAllPlaylist()
    }, [])

    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} />
            })}

        </div>
    );
}

export default Playlists;
