# Material UI - Create React App example with styled-components in TypeScript

The main difference between this and the non-TypeScript example is that you need to add the following path config to your `tsconfig.json`:

```json
"paths": {
  "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
}
```

and install @types/styled-components:

```sh
npm install --save-dev @types/styled-components
```

Alternatively, to skip this configuration, you can set `skipLibCheck: true` in your tsconfig.

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```sh
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/material-cra-styled-components-ts
cd material-cra-styled-components-ts
```

Install it and run:

```sh
npm install
npm start
```

## Test Requirements
1. Offers a text input field to enter search strings
2. Updates search results automatically as you type ("autocomplete")
3. Calls an API to load a list of movies (Please use this API: https://api.netzkino.de.simplecache.net/capi-2.0a/search?q=hitchcock&d=devtest , replace hitchcock with the entered search term)
4. Displays these movies in a list, each with its title (use the respective field inside the response)
5. For each displayed movie, please parse the "IMDb-Link" field for the movies' IMDb-Id (such as tt0036621)
6. Then search The Movie DB (https://developers.themoviedb.org/3/getting-started) for this IMDb-Id; use this API Key: 78247849b9888da02ffb1655caa3a9b9 (https://api.themoviedb.org/3/find/tt0036621?api_key=78247849b9888da02ffb1655caa3a9b9&language=en-US&external_source=imdb_id)
7. Finally, when found, display the poster-Image TMDb provides and display it next to the movies' title in the list. (Use the API Docs to understand how to get to the image specified in poster_path)
