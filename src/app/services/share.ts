import {Injectable} from '@angular/core';
import * as _ from 'lodash'
@Injectable()
export class Shared{
    public data:any[] =[];
    
    getData(){
        var a = [1,2,3];
       return  _.filter(a, function(a){
            return a%2;
        })
    }
}