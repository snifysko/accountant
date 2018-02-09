export class CategoryInfo {
	constructor(
		public id: number,
		public name: string, 
		public capacity: number,
		public totalCost: number,
		public percent: number,
		public percentWidth: string,
		public colorClass: string		
	){}
}