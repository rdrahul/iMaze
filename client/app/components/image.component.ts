import {Component} from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router';
import {ImageService} from '../services/image.service';
@Component({
    selector : 'image',
    moduleId : 'module.id',
    templateUrl : 'templates/image.html',
    providers : [ ImageService ]

})
export class ImageComponent{
    title:string;
    query:string;
    query_obj:Object;
    show:boolean;
    images:Array<Object>;
    constructor( private route:ActivatedRoute, private router :Router, private imageService : ImageService){
        this.title = "Your Images Will appear here";
    }

    ngOnInit(){
        let service = this.route.params
        .switchMap((params: Params) => {
            this.query = params['query'];
            return this.imageService.getLocalImages(this.query);
        });
        service.subscribe(result => {
            this.query_obj = result[0].image_paths;
            console.log(result);
        });
        console.log( this.query_obj);

    }

    GetImages(){
        this.images = null;
        this.show = true;
        console.log("here");
        this.imageService
            .getImages(this.query)
            .subscribe( 
                result => {
                    this.images = result ;
                    console.log(this.images);
                    this.show = false;
                },
                err => {
                    console.log("error",err);
                    this.show = false;
                }
            
            );
        //console.log(this.images);
    }
}