import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class ImageService
{
    constructor(private http:Http){}
    
    getImages(query){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post( '/api/images' , {'query':query} , {headers : headers} )
            .map(result => result.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getQueries(){
        return this.http.get('/api/images')
            .map(result => result.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getLocalImages(query){
        console.log(query);
        var url = '/api/images/'+query;
        console.log(url);
        return this.http.get( url)
            .map(result => result.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
}
