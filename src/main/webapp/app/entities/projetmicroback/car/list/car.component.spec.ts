import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CarService } from '../service/car.service';

import { CarComponent } from './car.component';

describe('Car Management Component', () => {
  let comp: CarComponent;
  let fixture: ComponentFixture<CarComponent>;
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CarComponent],
    })
      .overrideTemplate(CarComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CarComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CarService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.cars?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
