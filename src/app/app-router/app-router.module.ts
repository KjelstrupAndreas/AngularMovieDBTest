import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';
import { VideoPlayComponent } from '../video-play/video-play.component';
import { ActorsComponent } from '../actors/actors.component';

const appRoutes: Routes = [
    { path: 'video-play/:path', component: VideoPlayComponent},
    { path: '**', component: MoviesComponent},
    { path: 'actors', component: ActorsComponent}

];

@NgModule({
    imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)],

    exports: [
        RouterModule],

})

export class AppRouterModule { }


