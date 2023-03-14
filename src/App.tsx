import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from "lodash";
import { Container, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import Box from '@mui/material/Box';

import { MOVIE_SEARCH_API, MOVIEDB_API, POSTER_IMG_PATH, DEBOUBCE_DELAY } from './helpers/constants'

interface IMovie {
  title: string;
  IMDB_id: string;
  poster_path: string;
}

export default function App() {

  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Array<IMovie>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function search(text: string) {
    setLoading(true);
    const response = await axios.get(
      `${MOVIE_SEARCH_API}?q=${text}&d=devtest`
    );
    setLoading(false)
    if (response.data.posts.length > 0) {
      return response.data.posts.map((post: any) => {
        let lastIndex = post['custom_fields']['IMDb-Link'][0].lastIndexOf('/')
        return {
          title: post['title'],
          IMDB_id: post['custom_fields']['IMDb-Link'][0].slice(lastIndex + 1)
        }
      })
    } else {
      return []
    }
  };

  function getPosterImage(movieList: Array<IMovie>) {
    const promises = [];
    for (let i = 0; i < movieList.length; i++) {
      let promise = axios.get(`${MOVIEDB_API}/${movieList[i].IMDB_id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY }&language=en-US&external_source=imdb_id`);
      promises.push(promise)
    }

    Promise.all(promises).then((res: any) => {
      setMovies(movieList.map((movie: IMovie, index: number) => {
        if (res[index].data['movie_results'].length > 0) {
          return {
            ...movie,
            poster_path: `${POSTER_IMG_PATH}${res[index].data['movie_results'][0]['poster_path']}`
          }
        } else {
          return {
            ...movie,
            poster_path: ''
          }
        }
      }))
    })
  }

  const debouncedSearch = debounce(async (text) => {
    let searchRessult = await search(text)
    setMovies(searchRessult)
    getPosterImage(searchRessult)
  }, DEBOUBCE_DELAY);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    debouncedSearch(event.target.value)
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 10 }}>
        <Typography variant="h4" component="h1" sx={{my: 6}}>
          React Movie App
        </Typography>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          sx={{width: 500, my: 6}}
          value={query}
          onChange={(event: any) => onChange(event)} 
        />
        {loading && <ListItem>Loading ...</ListItem>}
        {!loading && movies.length === 0 && <ListItem>No result to display</ListItem>}
        {!loading && movies.length > 0 && (
          <List sx={{width: '100%', maxHeight: 500, overflow: 'auto'}}>
            { movies.map((movie, index) => {
              return (
                <ListItem key={index}>
                  <MovieCreationOutlinedIcon sx={{mr: 3}}/>
                  <ListItemText primary={movie.title} />
                  <img src={movie.poster_path} alt="" style={{width: '100px', height: '120px'}} />
                </ListItem>
              )
            })}
          </List>
        )}
      </Box>
    </Container>
  );
}
