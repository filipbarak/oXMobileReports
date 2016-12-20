/**
 * Created by Filip on 12/20/2016.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpaid'
})

export class FilterByPaid implements PipeTransform {
  transform(value) {
    return value.filter((item)=> item.Dolzi!==0);
  }

}
