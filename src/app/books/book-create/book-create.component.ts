import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksApiService } from '../../api/services/books/books-api.service';

@Component({
	selector: 'app-book-create',
	templateUrl: './book-create.component.html',
	styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
	private postReq : any;
	createBookForm  : FormGroup;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private booksApiService: BooksApiService) { }

	ngOnInit() {
		this.createForm();
	}

	createForm(){
		this.createBookForm = this.formBuilder.group({
	      'title'  : [null, Validators.compose([Validators.required])],
	      'author' : [null, Validators.compose([Validators.required])],
	      'type'   : [null, Validators.compose([Validators.required])],
	      'isbn'   : [null, Validators.compose([Validators.required])]
	    });
	}

	addBook(){
		let body = {
			'title'  : this.createBookForm.get('title').value,
			'author' : this.createBookForm.get('author').value,
			'type'   : this.createBookForm.get('type').value,
			'isbn'   : this.createBookForm.get('isbn').value
		}

		this.postReq = this.booksApiService
			.createBook(JSON.stringify(body))
			.subscribe(result => {
				sessionStorage.setItem('addMessage', 'Successfully added a book');
				this.router.navigate(['/books']);
			}, (err) => {
				console.log(err)
		})
	}

	ngOnDestroy(){
		if(this.postReq) this.postReq.unsubscribe();
	}

}
