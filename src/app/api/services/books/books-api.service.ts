import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';

const hostUrl  = 'http://localhost:9001'
const endpoint = `${hostUrl}/api/books`

@Injectable({
	providedIn: 'root'
})
export class BooksApiService {
	constructor(private http: Http) { }

	getBookList(): Observable<any>{
		return this.http
		.get(`${endpoint}/list`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	createBook(body: any): Observable<any>{
		return this.http
		.post(`${endpoint}/create`, body)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	bookDetails(id: string): Observable<any>{
		return this.http
		.get(`${endpoint}/details/${id}`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	updateBook(id: string, body: any): Observable<any>{
		return this.http
		.put(`${endpoint}/update/${id}`, body)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	deleteBook(id: string): Observable<any>{
		return this.http
		.delete(`${endpoint}/delete/${id}`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// error handler
	private handleError(error:any, caught:any): any{
		sessionStorage.setItem('notFound', 'true');
		throw error;
	}
}

