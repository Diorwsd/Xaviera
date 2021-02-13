import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardComponent} from './board/board.component';
import {AddressFormComponent} from './address-form/address-form.component';
import {NavigationComponent} from './navigation/navigation.component';
// import {TableComponent} from './table/table.component';
// import {TreeComponent} from './tree/tree.component';
// import {DragDropComponent} from './drag-drop/drag-drop.component';


const routes: Routes = [{
  path: `board`,
  component: BoardComponent
}, {
  path: `address`,
  component: AddressFormComponent
}, {
  path: `navigation`,
  component: NavigationComponent
},
// {
//   path: `table`,
//   component: TableComponent
// },
//   {
//     path: `tree`,
//     component: TreeComponent
//   },
//   {
//     path: `drag-drop`,
//     component: DragDropComponent
//   }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialWayRoutingModule {
}
