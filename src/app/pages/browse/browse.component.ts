import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { MovieCategoryComponent } from "../../components/movie-category/movie-category.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movies';
import { tmdbConfig } from '../../constants/config';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, MovieCategoryComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
  movieService = inject(MovieService);
  popularMovie: Movie[] = [];
  topRatedMovie: Movie[] = [];
  nowPlayingMovie: Movie[] = [];
  upcomingMovie: Movie[] = [];
  bannerMovie!: Movie;
  tmdbConfig = tmdbConfig
  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((res: any) => {
      this.popularMovie = res.results;
      this.bannerMovie = this.popularMovie[0];
      console.log(res);
    });

    this.movieService.getTopRatedMovies().subscribe((res: any) => {
      this.topRatedMovie = res.results;
      console.log(res);
    });

    this.movieService.getNowPlayingMovies().subscribe((res: any) => {
      this.nowPlayingMovie = res.results;
      console.log(res);
    });

    this.movieService.getUpcomingMovies().subscribe((res: any) => {
      this.upcomingMovie = res.results;
      console.log(res);
    });
  }
}
