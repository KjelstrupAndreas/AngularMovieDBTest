import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Actor } from '../actor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  private actors: Actor[];

  constructor(private service: HttpService,
              private route: ActivatedRoute,
              private router: Router) {
               }

  ngOnInit() {
    this.service.getMostPopularActors().subscribe(response => this.actors = response);
  }
}
