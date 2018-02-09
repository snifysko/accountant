import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform {

	transform(events: any[], minLen: number, searchStr: string, field: string): any {
		if(events.length === 0 || searchStr.length < minLen) return events;
		
		return events.filter(i => {
			let tmp = Object.assign({}, i);
			if(!isNaN(tmp[field])) tmp[field] += '';
			if(field === 'category') tmp[field] = tmp.catName;
			if(field === 'type') tmp[field] = tmp[field] === 'income' ? 'доход' : 'расход';

			return tmp[field].toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
		});
	}

}