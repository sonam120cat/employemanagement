import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    component.employees = [
      {
        name: 'Andrew Bridgen',
        role: 'Sr. UI Developer',
        rating: 3.5,
        experience: '5.8 Years',
        joiningDate: '2017',
        team: 'OCBC Singapore',
        manager: 'Lalit Agarwal',
        phone: '7406559241',
        email: 'andrew@infrrd.ai',
        photoUrl: 'assets/andrew1.jpg'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of results', () => {
    const header = fixture.nativeElement.querySelector('.header h3');
    expect(header.textContent).toContain('1 Results Found');
  });

  it('should render employee name', () => {
    const nameElement = fixture.nativeElement.querySelector('.employee-details h4');
    expect(nameElement.textContent).toContain('Andrew Bridgen');
  });

  it('should display the correct rating stars', () => {
    const stars = fixture.nativeElement.querySelectorAll('.star.filled');
    expect(stars.length).toBe(3);
  });
});
