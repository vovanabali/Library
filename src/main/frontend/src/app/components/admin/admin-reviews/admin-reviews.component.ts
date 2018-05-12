import {Component, OnInit} from '@angular/core';
import {ReviewsOfTheBook} from '../../../domains/reviews-of-the-book';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {ReviewService} from '../../../services/review.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css']
})
export class AdminReviewsComponent implements OnInit {
  reviews: ReviewsOfTheBook[];
  selectReview = new ReviewsOfTheBook();
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;

  constructor(private reviewsService: ReviewService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'persona', header: 'Логин'},
      {field: 'book', header: 'Книга'},
      {field: 'reviews', header: 'Отзыв'},
      {field: 'rating', header: 'Рэйтинг'},
    ];
    this.reviewsService.getAllRewiews().subscribe((reviews) => this.totalRecords = reviews.length);
    this.loading = true;
  }

  lazyLoad(event: LazyLoadEvent): void {
    this.loading = true;
    this.reviewsService.slice(event.first / event.rows, event.rows, event.sortField, event.sortOrder).subscribe((reviews) => {
      this.reviews = reviews;
      this.loading = false;
    });
  }

  editEntry(id: number): void {
    if (id != null) {
      const isNavigate = this.router.navigate(['admin/editReview'], {queryParams: {'id': id}});
      if (!isNavigate) {
        this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не открыть запись на редактирование!'}];
      }
    }
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.reviewsService.deleteReviewById(id).subscribe((result) => {
          if (result) {
            this.selectReview = new ReviewsOfTheBook();
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }
}
