import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { MovieCategoryComponent } from "../../components/movie-category/movie-category.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movies';
import { tmdbConfig } from '../../constants/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, MovieCategoryComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
  movieService = inject(MovieService);
  public domSanitizer = inject(DomSanitizer);
  popularMovie: Movie[] = [];
  topRatedMovie: Movie[] = [];
  nowPlayingMovie: Movie[] = [];
  upcomingMovie: Movie[] = [];
  bannerMovie!: Movie;
  tmdbConfig = tmdbConfig;


  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((result: any) => {
      this.popularMovie = result.results;
      this.bannerMovie = this.popularMovie[0];

      this.movieService.getMoviesVideos(this.bannerMovie.id).subscribe((response: any) => {
        console.log(response);        
        this.bannerMovie.video_key = response.results.find(((x: { site: string; }) => x.site == "YouTube")).key      
      });
    });

    this.movieService.getTopRatedMovies().subscribe((res: any) => {
      this.topRatedMovie = res.results;
    });

    this.movieService.getNowPlayingMovies().subscribe((res: any) => {
      this.nowPlayingMovie = res.results;
    });

    this.movieService.getUpcomingMovies().subscribe((res: any) => {
      this.upcomingMovie = res.results;
    });
  }
}
