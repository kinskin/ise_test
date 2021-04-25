import fetch from "node-fetch";

const API_KEY = "?api_key=99c701c99d73755393ece62e87f1dd84";
const BASE_URL = "https://api.themoviedb.org/3";

const paths = {
    movies: {
        latest: { path: "/latest", method: "get" },
        upcoming: { path: "/upcoming", method: "get" },
        topRated: { path: "/top_rated", method: "get" },
        popular: { path: "/popular", method: "get" },
    },
    series: {
        popular: { path: "/popular", method: "get" },
        topRated: { path: "/top_rated", method: "get" },
    },
    genre: {
        movie: { path: "/movie/list", method: "get" },
        tv: { path: "/tv/list", method: "get" },
    },
    base: {
        movie: { path: "/movie", method: "get" },
        series: { path: "/tv", method: "get" },
    },
};

const fetchMovies = async (type, page = 1) => {
    let pageExtention = `&page=${page}`;
    let { path, method } = paths.movies[`${type}`];
    let fetchPath = `${BASE_URL}/movie${path}${API_KEY}${type !== "latest" ? pageExtention : ""}`;
    let resp = await fetch(fetchPath, { method });
    resp = await resp.json();
    return resp;
};

const fetchSeries = async (type, page = 1) => {
    let pageExtention = `&page=${page}`;
    let { path, method } = paths.movies[`${type}`];
    let fetchPath = `${BASE_URL}/tv${path}${API_KEY}${type !== "latest" ? pageExtention : ""}`;
    let resp = await fetch(fetchPath, { method });
    resp = await resp.json();
    return resp;
};

const fetchGenres = async (type) => {
    let { path, method } = paths.genre[`${type}`];
    let fetchPath = `${BASE_URL}${path}${API_KEY}`;
    let resp = await fetch(fetchPath, { method });
    resp = await resp.json();
    return resp;
};

const fetchTrending = async (type, subType) => {
    let { path, method } = paths.base[`${type}`];
    let fetchPath = `${BASE_URL}/trending${path}/${subType}${API_KEY}`;
    let resp = await fetch(fetchPath, { method });
    resp = await resp.json();
    return resp;
};

const fetchSearch = async (searchType, searchValue, page) => {
    let { path, method } = paths.base[`${searchType}`];
    let fetchPath = `${BASE_URL}/search${path}${API_KEY}&query=${searchValue}&page=${page}`;
    let resp = await fetch(fetchPath, { method });
    resp = await resp.json();
    return resp;
};

const fetchById = async (type, id) => {
    let resp;
    if (type) {
        let { path, method } = paths.base[`${type}`];
        let fetchPath = `${BASE_URL}${path}/${id}${API_KEY}`;
        resp = await fetch(fetchPath, { method });
        resp = await resp.json();
        return resp;
    }

    let { movie, series } = paths.base;
    resp = await fetch(`${BASE_URL}${movie.path}/${id}${API_KEY}`, { method: movie.method });

    if (resp.status !== 200) {
        resp = await fetch(`${BASE_URL}${series.path}/${id}${API_KEY}`, { method: series.method });
    }
    resp = await resp.json();

    return resp;
};

export { fetchMovies, fetchSeries, fetchGenres, fetchTrending, fetchSearch, fetchById };
