import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of navigation items', () => {
    const navItems = fixture.nativeElement.querySelectorAll('.nav-items .nav-item');
    expect(navItems.length).toBe(component.navItems.length);
  });

  it('should display notification badge for messages', () => {
    const messageNavItem = fixture.nativeElement.querySelector('.nav-item:nth-child(2) .badge');
    expect(messageNavItem).toBeTruthy();
    expect(messageNavItem.textContent).toContain('99');
  });

  it('should display footer items correctly', () => {
    const footerItems = fixture.nativeElement.querySelectorAll('.footer .nav-item');
    expect(footerItems.length).toBe(component.footerItems.length);
  });
});
