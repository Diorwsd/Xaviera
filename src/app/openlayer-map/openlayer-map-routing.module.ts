import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EMapComponent} from './e-map/e-map.component';

const routes: Routes = [
  {path: `emap`, component: EMapComponent},
  { path: ``, redirectTo: `emap`, pathMatch: `full`}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class OpenlayerMapRoutingModule {
}
