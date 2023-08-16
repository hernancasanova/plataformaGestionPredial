import { Injectable, OnInit, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

//import { Country } from '../models/country';
//import { BOVINES } from './countries';
import { DatePipe, DecimalPipe, JsonPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import { VacunosService } from '../services/vacunos.service';
import { Country } from '../models/country';

interface SearchResult {
	countries: any[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
	type: any;
}

//var BOVINES: any = [];

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(countries: [], column: SortColumn, direction: string): any[] {
	if (direction === '' || column === '') {
		return countries;
	} else {
		return [...countries].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(country: Country, term: string, pipe: PipeTransform, type: any) {
	return (
		(country.name.toLowerCase().includes(term.toLowerCase()) ||
		country.diio.toLowerCase().includes(term.toLowerCase()) ) &&
		type.includes(country.type)
		//pipe.transform(country.date_birth).includes(term) ||
		//pipe.transform(country.sex).includes(term)
	);
}

@Injectable({ providedIn: 'root' })
export class CountryService{
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _countries$ = new BehaviorSubject<any[]>([]);
	private _total$ = new BehaviorSubject<number>(0);
	BOVINES: any = [];

	getBovines(): any {
		this.vacunoService.getBovines().subscribe(vac=>{
			//console.log("desde getBovines: ",vac)
			this.BOVINES=vac;
			//return BOVINES;
		})
	}

	private _state: State = {
		page: 1,
		pageSize: 5,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
		type: ['all'],
	};

	constructor(private pipe: DecimalPipe, private vacunoService: VacunosService) {
		this.getBovines();
		setTimeout(()=>{
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._countries$.next(result.countries);
				this._total$.next(result.total);
			});

		this._search$.next();
		},5000)
		//this.getBovines();
	}

	get countries$() {
		//console.log("desde get countries: ",this._countries$);
		// this.getBovines();
		// setTimeout(()=>{
		// },2000)
		//return this.getBovines();
		return this._countries$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	get type() {
		return this._state.type;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set type(type: any) {
		this._set({ type });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm, type} = this._state;

		// 1. sort
		//console.log("countries antes de sort: ",this.BOVINES)
		let countries = sort(this.BOVINES, sortColumn, sortDirection);
		//console.log("countries después de sort: ",countries)

		// 2. filter
		let types=type[0]=='all'?['Ternero','Ternera','Toro','Vaquilla','Vaca','Buey','Novillo']:type;
		countries = countries.filter((country) => matches(country, searchTerm, this.pipe, types));
		const total = countries.length;

		// 3. paginate
		countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ countries, total });
	}
}