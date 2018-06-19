import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksApiService } from '../../api/services/books/books-api.service';

@Component({
	selector: 'app-book-update',
	templateUrl: './book-update.component.html',
	styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {
	private postReq : any;
	private req     : any;
	private routeSub: any;

	book_id : string;
	updateBookForm  : FormGroup;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private booksApiService: BooksApiService) { }

	ngOnInit() {
		this.createUpdateForm();
	}

	// get book details and create update form
	createUpdateForm(){
		this.updateBookForm = this.formBuilder.group({
	      'title'  : [null, Validators.compose([Validators.required])],
	      'author' : [null, Validators.compose([Validators.required])],
	      'type'   : [null, Validators.compose([Validators.required])],
	      'isbn'   : [null, Validators.compose([Validators.required])]
	    });

		this.routeSub = this.activatedRoute.params.subscribe(params => {
			this.book_id = params['id'];
			this.req = this.booksApiService.bookDetails(this.book_id)
			.subscribe(result =>{
				this.updateBookForm.get('title').setValue(result.book.Title);
				this.updateBookForm.get('author').setValue(result.book.Author);
				this.updateBookForm.get('type').setValue(result.book.Type);
				this.updateBookForm.get('isbn').setValue(result.book.ISBN);
			});
		});
	}

	// update the book details
	updateBook(){
		let body = {
			'title'  : this.updateBookForm.get('title').value,
			'author' : this.updateBookForm.get('author').value,
			'type'   : this.updateBookForm.get('type').value,
			'isbn'   : this.updateBookForm.get('isbn').value
		}

		this.postReq = this.booksApiService
			.updateBook(this.book_id, JSON.stringify(body))
			.subscribe(result => {
				sessionStorage.setItem('updateMessage', 'Successfully updated the book details');
				this.router.navigate(['/books']);
			}, (err) => {
				console.log(err)
		});
	}

	ngOnDestroy(){
		if(this.postReq) this.postReq.unsubscribe();
	}

}
