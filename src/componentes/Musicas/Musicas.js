import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([]);
    //exercicio 4 
    const [artista, setArtista] = useState('');
    const [nomeMusica, setNomeMusica] = useState('');
    const [url, setUrl] = useState('');
    

    // pegando as musicas das playlist Exercicio 3 
    const config = { headers: { Authorization: "david-alves-barbosa" } };

    const getPlaylistTracks = (id) => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`, config)
            .then((response) => {
                setMusicas(response.data.result.tracks);

            }).catch((error) => {
                console.log(error.response.data)
            })
    }

    // POST para criacao de novas musicas
    const createNewTrack = (id) => {
        const config = { headers: { Authorization: "david-alves-barbosa" } };
        const body = {
            name: nomeMusica,
            artist: artista,
            url: url
        };
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`, body, config)
            .then((response) => {
                alert('Música Adicionada')
            }).catch((error) => {
                alert(error)
            })

        setArtista('')
        setNomeMusica('')
        setUrl('')
        getPlaylistTracks(id)
    }
    //renderiza a lista 
    useEffect(() => {
        getPlaylistTracks(props.playlist.id)
    }, [])
    
    // Remove a musica da playlist
    const removeTrackFromPlaylist = (id, trackId) => {
        const config = { headers: { Authorization: "david-alves-barbosa" } };
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks/${trackId}`, config)
            .then((response) => {
                alert("Música deletada")
                getPlaylistTracks(id)
            }).catch((error) => {
                alert(error)
            })

    }


    useEffect(() => {
        getPlaylistTracks(props.playlist.id)
    }, [])
    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() => removeTrackFromPlaylist(props.playlist.id, musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>

                <InputMusica value={artista} onChange={(e) => { setArtista(e.target.value) }} placeholder="artista" />

                <InputMusica value={nomeMusica} onChange={(e) => { setNomeMusica(e.target.value) }} placeholder="musica" />

                <InputMusica value={url} onChange={(e) => { setUrl(e.target.value) }} placeholder="url" />

                <Botao onClick={() => createNewTrack(props.playlist.id)}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

