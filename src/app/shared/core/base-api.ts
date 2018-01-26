import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseApi {
	readonly  baseUrl = 'http://localhost:3000';

	constructor(public http: Http){
	}

	private GetUrl(url: string): string {
		return this.baseUrl + url;
	}

	get(url: string = ""): Observable<any>{
		return this.http.get(this.GetUrl(url))
			.map( (response: Response) => response.json() );
	}

	post(url: string, data: any): Observable<any>{
		return this.http.post(this.GetUrl(url), data)
			.map( (response: Response) => response.json() );
	}

	put(url: string, data: any): Observable<any>{
		return this.http.put(this.GetUrl(url), data)
			.map( (response: Response) => response.json() );
	}

}
