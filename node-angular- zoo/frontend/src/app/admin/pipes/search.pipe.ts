import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

@Injectable()
export class SearchPipe implements PipeTransform{
    transform(items: any, term: String):any{
        if(term === undefined){
            return items;
        }
        // console.log(items);
        return items.filter(function(item){
            console.log(typeof(item.name));
            return item['name'].toLowerCase().includes(term.toLowerCase());
        });

    }
}