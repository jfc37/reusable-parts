import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fuseWidgetToggle]'
})
export class FuseWidgetToggleDirective
{
    /**
     * Constructor
     *
     *  {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
