import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentFormPage } from './comment-form.page';

describe('CommentFormPage', () => {
  let component: CommentFormPage;
  let fixture: ComponentFixture<CommentFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
