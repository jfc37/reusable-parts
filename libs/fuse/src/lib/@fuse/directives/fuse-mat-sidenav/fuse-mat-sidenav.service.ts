import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class FuseMatSidenavHelperService
{
    sidenavInstances: MatSidenav[];

    /**
     * Constructor
     */
    constructor()
    {
        this.sidenavInstances = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set sidenav
     *
     *  id
     *  instance
     */
    setSidenav(id, instance): void
    {
        this.sidenavInstances[id] = instance;
    }

    /**
     * Get sidenav
     *
     *  id
     *  {any}
     */
    getSidenav(id): any
    {
        return this.sidenavInstances[id];
    }
}
