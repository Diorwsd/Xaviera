import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialWayModule } from './material-way/material-way.module';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: `material-way`,
    loadChildren: () =>
      import('./material-way/material-way.module').then(
        (m) => m.MaterialWayModule
      ),
  },
  // {
  //   path: `openlayer`,
  //   loadChildren: () =>
  //     import('./openlayer-map/openlayer-map.module').then(
  //       (m) => m.OpenlayerMapModule
  //     ),
  // },
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  // {path: ``, loadChildren: () => import('./openlayer-map/openlayer-map.module').then(m => m.OpenlayerMapModule)},
  // {path: '/', component: AppComponent}
];

@NgModule({
  imports: [],
  exports: [],
})
export class AppRoutingModule {}
