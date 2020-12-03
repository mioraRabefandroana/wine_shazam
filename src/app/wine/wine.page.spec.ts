import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WinePage } from './wine.page';

describe('WinePage', () => {
  let component: WinePage;
  let fixture: ComponentFixture<WinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
