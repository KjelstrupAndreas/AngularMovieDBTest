import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Movie } from '../movie';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from '../actor';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  private movies: Movie[];
  private actors: Actor[];
  private searchName: string;
  constructor(private service: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  async playMovie(movie: Movie) {
    const path: string = await this.service.getVideos(movie.id);
    this.router.navigate(['video-play', path]);
  }

  onClick(searchName: string) {
    this.service.getMovie(searchName).subscribe(response => this.movies = response);
  }

  popularMovies() {
    this.service.getMostPopularMovies().subscribe(response => this.movies = response);
  }

  upcomingMovies() {
    this.service.getUpcomingMovies().subscribe(response => this.movies = response);
  }

  goToPopularActors()  {
    this.router.navigate(['actors']);
  }
}
