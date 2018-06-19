import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { BookCreateComponent } from '../books/book-create/book-create.component';
import { BookUpdateComponent } from '../books/book-update/book-update.component';
import { BooksApiService } from '../api/services/books/books-api.service';
import { SearchPipe } from '../pipes/search-pipe';

const homeRoute: Routes = [
  	{ path: '', component: HomeComponent },
    { path: 'books',
      children: [
        { path: '', component: HomeComponent },
        { path: 'add', component: BookCreateComponent },
        { path: 'update/:id', component: BookUpdateComponent }
      ]
    }
];

@NgModule({
  imports: [
    SharedModule,
  	RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    BookCreateComponent,
    BookUpdateComponent,
    SearchPipe
  ],
  providers: [BooksApiService]
})

export class HomeRoutingModule { }