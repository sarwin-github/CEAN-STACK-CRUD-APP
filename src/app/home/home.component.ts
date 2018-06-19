import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksApiService } from '../api/services/books/books-api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private req : any;
	private deleteReq : any;
	list: IBooks;
	
	addMessage    : string = sessionStorage.getItem('addMessage');
	updateMessage : string = sessionStorage.getItem('updateMessage');
	deleteMessage : string = sessionStorage.getItem('deleteMessage');

	book_search   : string;
	book_id       : string;
	book_title    : string;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private booksApiService: BooksApiService) { }

	ngOnInit() {
		this.getBookList()
	}

	getBookList(){
		this.req = this.booksApiService.getBookList()
			.subscribe(result => {
				this.list = <IBooks>{ 
					books      : result.books.rows,
					offset     : result.books.offset,
					total_rows : result.books.total_rows
				}
			}, (err) => {
				sessionStorage.setItem('sessionError', err);
				sessionStorage.setItem('sessionUrl', this.router.url);
				console.log(err)
		})
	}

	// set modal data for deleting a book
	deleteButtonClick(id: string, title: string): void{
		this.book_id   = id;
		this.book_title = title;
	}

	// proceed deleting a book
	proceedDeleteClick(): void{
		this.deleteReq = this.booksApiService.deleteBook(this.book_id)
			.subscribe(result =>{
				window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
				sessionStorage.setItem('deleteMessage', 'Successfully deleted a book');
				this.deleteMessage = sessionStorage.getItem('deleteMessage');
				this.getBookList();
			}, (err) => {
				sessionStorage.setItem('sessionError', err);
				sessionStorage.setItem('sessionUrl', this.router.url);
				console.log(err)
		})
	}

	// clear error message
	onAlertClose(): void {
		sessionStorage.removeItem('addMessage');
		sessionStorage.removeItem('updateMessage');
		sessionStorage.removeItem('deleteMessage');
	   	this.deleteMessage = null;
	}

	ngOnDestroy(){
		sessionStorage.removeItem('addMessage');
		sessionStorage.removeItem('updateMessage');
		sessionStorage.removeItem('deleteMessage');
		this.req.unsubscribe();
		if(this.deleteReq) this.deleteReq.unsubscribe();
	}
}

interface IBooks{
	books      : any[],
	offset     : number,
	total_rows : number
}