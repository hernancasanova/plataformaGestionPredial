import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app-carousel', templateUrl: './carousel.component.html' })
export class CarouselComponent implements OnInit {

	constructor(private router: Router){

	}

	@Input () idBovine: any;
	@Output()
  	clickImage = new EventEmitter<any>();

	clickImagen(event:any,id:number){
		this.clickImage.emit(event);
		this.router.navigate(["/bovines/edit/"+id])
	}

	ngOnInit(): void {
	}

	  images = [
		{ src: "http://localhost:8006/images/bovines/1", alt: 'Image 1' },
		{ src: "http://localhost:8006/images/bovines/2", alt: 'Image 2' },
		{ src: "http://localhost:8006/images/bovines/3", alt: 'Image 3' }
	];
}
