import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICar, Car } from '../car.model';

import { CarService } from './car.service';

describe('Car Service', () => {
  let service: CarService;
  let httpMock: HttpTestingController;
  let elemDefault: ICar;
  let expectedResult: ICar | ICar[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 'AAAAAAA',
      marque: 'AAAAAAA',
      prix: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Car', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Car()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Car', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          marque: 'BBBBBB',
          prix: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Car', () => {
      const patchObject = Object.assign(
        {
          marque: 'BBBBBB',
          prix: 1,
        },
        new Car()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Car', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          marque: 'BBBBBB',
          prix: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Car', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCarToCollectionIfMissing', () => {
      it('should add a Car to an empty array', () => {
        const car: ICar = { id: 'ABC' };
        expectedResult = service.addCarToCollectionIfMissing([], car);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(car);
      });

      it('should not add a Car to an array that contains it', () => {
        const car: ICar = { id: 'ABC' };
        const carCollection: ICar[] = [
          {
            ...car,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addCarToCollectionIfMissing(carCollection, car);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Car to an array that doesn't contain it", () => {
        const car: ICar = { id: 'ABC' };
        const carCollection: ICar[] = [{ id: 'CBA' }];
        expectedResult = service.addCarToCollectionIfMissing(carCollection, car);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(car);
      });

      it('should add only unique Car to an array', () => {
        const carArray: ICar[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: '7af04e9c-0794-4f7c-9d6c-6d04bd311937' }];
        const carCollection: ICar[] = [{ id: 'ABC' }];
        expectedResult = service.addCarToCollectionIfMissing(carCollection, ...carArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const car: ICar = { id: 'ABC' };
        const car2: ICar = { id: 'CBA' };
        expectedResult = service.addCarToCollectionIfMissing([], car, car2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(car);
        expect(expectedResult).toContain(car2);
      });

      it('should accept null and undefined values', () => {
        const car: ICar = { id: 'ABC' };
        expectedResult = service.addCarToCollectionIfMissing([], null, car, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(car);
      });

      it('should return initial array if no Car is added', () => {
        const carCollection: ICar[] = [{ id: 'ABC' }];
        expectedResult = service.addCarToCollectionIfMissing(carCollection, undefined, null);
        expect(expectedResult).toEqual(carCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
