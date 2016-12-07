/**
 * Created by Filip on 9/12/2016.
 */
import {Pipe, PipeTransform} from '@angular/core'
@Pipe({
  name: 'filter'
})
export class filterPipe implements PipeTransform {
  constructor() {

  }

  transform(niza: any, keyword: string, args: Array<any>) {
    if (niza && keyword)
      return niza.filter((item: any) => {
        var contains = false;
        if (args)
          args.forEach(arg => {
            var obj =
              (arg.indexOf('.') == -1) ? item[arg] : this.objByString(item, arg);
            if (obj)
              if (obj.toLowerCase().indexOf(keyword.toLowerCase()) != -1)
                contains = true;
          });
        else contains = item.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
        return contains;
      });
    else
      return niza;
  }

  objByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.'), i = 0;
    while (i < a.length) {
      if (o[a[i]]) {
        o = o[a[i]];
      }
      ++i;
    }
    return o.toString();
  }
}
