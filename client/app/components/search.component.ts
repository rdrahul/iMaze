import {Component} from '@angular/core';
import {ImageService} from '../services/image.service';
@Component({
    selector : 'search',
    moduleId : 'module.id',
    templateUrl : 'templates/search.html',
    providers : [ ImageService ]

})
export class SearchComponent{
    title:string;
    query:string;
    showProgress:boolean;
    images:Array<Object>;
    constructor(private imageService : ImageService){
        this.title = "Your Images Will appear here";
    }

    GetImages(){

        this.images = null;
        this.showProgress = true;
        console.log("here");
        this.imageService
            .getImages(this.query)
            .subscribe( 
                result => {
                    this.images = result ;
                    console.log(this.images);
                    this.showProgress = false;
                },
                err => {
                    console.log("error",err);
                    this.showProgress = false;
                }
            
            );
        //console.log(this.images);
    }
}