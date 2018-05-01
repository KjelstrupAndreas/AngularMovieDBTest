import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

import { Movie } from './movie';
import { Actor } from './actor';

interface IMovieData {results: Movie[]; }
export interface IVideoData {results: IVideo[]; }
export interface IVideo {'id': string; 'key': string; 'name': string; 'site': string; 'type': string; }

interface IActorData {results: Actor[]; }

@Injectable()
export class HttpService {

    private movies: any;

    private actors: any;

    constructor(private http: Http) { }

    public getMovies(): Observable<Response> {
        // tslint:disable-next-line:max-line-length
        return this.http.get('http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=167469ac3f6765a3c2cb48c5be4e4904');
    }

    public getMovie(title: string): Observable<Movie[]> {
        return this.http.get('http://api.themoviedb.org/3/search/movie?query=' + title + '&api_key=167469ac3f6765a3c2cb48c5be4e4904')
        .map(response => {
            const data: IMovieData = response.json();
            return data.results.filter(movie => movie.poster_path !== null).map(movie => {
                return <Movie>{'id' : movie.id,
                'title' : movie.title,
                'poster_path' : 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                'adult' : movie.adult,
                'overview' : movie.overview,
                'release_date' : movie.release_date,
                'genres' : movie.genres,
                'vote_average' : movie.vote_average }; });
        });
    }

    public getMostPopularActors(): Observable<Actor[]> {
        return this.http.get('https://api.themoviedb.org/3/person/popular?api_key=167469ac3f6765a3c2cb48c5be4e4904&language=en-US&page=1')
        .map(response => {
            const data: IActorData = response.json();
            return data.results.filter(actor => actor.profile_path !== null).map(actor => {
                return <Actor>{'id': actor.id,
                               'name': actor.name,
                               'profile_path': 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + actor.profile_path,
                               'biography': actor.biography};
            });
        });
    }

    public getMostPopularMovies(): Observable<Movie[]> {
        return this.http.get('http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=167469ac3f6765a3c2cb48c5be4e4904')
        .map(response => {
          const data: IMovieData = response.json();
          return data.results.filter(movie => movie.poster_path !== null).map(movie => {
            return <Movie>{'id' : movie.id,
                            'title' : movie.title,
                            'poster_path' : 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                            'adult' : movie.adult,
                            'overview' : movie.overview,
                            'release_date' : movie.release_date,
                            'genres' : movie.genres,
                            'vote_average' : movie.vote_average }; });
        });
      }

    public getUpcomingMovies(): Observable<Movie[]> {
        return this.http.get('http://api.themoviedb.org/3/movie/upcoming?api_key=167469ac3f6765a3c2cb48c5be4e4904')
        .map(response => {
            const data: IMovieData = response.json();
            return data.results.filter(movie => movie.poster_path !== null).map(movie => {
                return <Movie>{'id' : movie.id,
                'title' : movie.title,
                'poster_path' : 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                'adult' : movie.adult,
                'overview' : movie.overview,
                'release_date' : movie.release_date,
                'genres' : movie.genres,
                'vote_average' : movie.vote_average }; });
        });
    }

    async getVideos(id: number): Promise<string> {
        console.log('getvideo1:' + id);
        // tslint:disable-next-line:max-line-length
        const response = await this.http.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=167469ac3f6765a3c2cb48c5be4e4904').toPromise();
        return response.json().results[0].key;
    }

    getYoutubePath(id: number): string {
        const path: string = 'https://www.youtube.com/embed/' + JSON.stringify(this.getVideos(id));
        return path;
    }

}

