import { Directive } from '@angular/core';
import { HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[loginDropdown]'
})
export class DropdownDirective {
	constructor() { }

	@HostBinding('class.open') isOpen = false;

	@HostListener('click') onclick() {
		this.isOpen = !this.isOpen;
	}

}