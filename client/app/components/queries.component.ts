import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';
import {Router } from '@angular/router';
@Component({
    moduleId: 'module.id',
    selector: 'queries',
    templateUrl: 'templates/queries.html',
    providers : [ ImageService ] 
})

export class QueriesComponent implements OnInit {
    queries:Array<string>;
    constructor( private router:Router ,private imageService : ImageService ) { }

    ngOnInit() {
        this.imageService.getQueries()
            .subscribe( queries => {
                this.queries = queries;
            },
            err => {
                console.log("error " , err);
            });
     }

    OnSelect( query ){
        console.log("here");
        this.router.navigate(['/images', query.query ]);
    }
}