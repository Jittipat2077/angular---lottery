import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavberComponent } from './navber/navber.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { BuyHistoryComponent } from './buy-history/buy-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDataComponent } from './add-data/add-data.component';
import { TodayComponent } from './today/today.component';
import { EditComponent } from './edit/edit.component';
import { ListBuyComponent } from './list-buy/list-buy.component';
import { MounthComponent } from './mounth/mounth.component';

const routes: Routes = [
  { path: 'buy-history', component: BuyHistoryComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-data', component: AddDataComponent },
  { path: 'today', component: TodayComponent },
  { path: 'edit', component: EditComponent },
  { path: 'list-buy', component: ListBuyComponent },
  { path: 'mounth', component: MounthComponent },
  { path: 'admin-update/:lot_id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
