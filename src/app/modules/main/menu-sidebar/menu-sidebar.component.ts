import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';
import packageInfo from './../../../../../package.json';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;
    public appname = packageInfo.appname;
    public apprights = packageInfo.apprights;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
        console.log(this.user);
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Oportunidades',
        iconClasses: 'fas fa-bullhorn',
        children: [
          {
              name: 'Arbitragem',
              iconClasses: 'fas fa-stack-exchange',
              path: ['/arbitragem']
          },
          {
            name: 'trio',
            iconClasses: 'fas fa-stack-exchange',
            path: ['/arbitragem2']
        }
        ]
    },

    {
        name: 'Configurações',
        iconClasses: 'fas fa-plus',
        children: [
            {
                name: 'APIs',
                iconClasses: 'fas fa-server',
                path: ['/APIs']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/sub-menu-2']
            },
            {
                name: 'Config',
                iconClasses: 'fas fa-wrench',
                path: ['/config']
            }
        ]
    }
];
