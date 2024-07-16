import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavberComponent } from './navber/navber.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { TreeSelectModule } from 'primeng/treeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { BuyHistoryComponent } from './buy-history/buy-history.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ListBuyComponent } from './list-buy/list-buy.component';
import { AddDataComponent } from './add-data/add-data.component';
import { EditComponent } from './edit/edit.component';
import { MounthComponent } from './mounth/mounth.component';
import { CalendarModule } from 'primeng/calendar';
import { BuyAllComponent } from './buy-all/buy-all.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodayComponent } from './today/today.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavberComponent,
    SearchComponent,
    HomeComponent,
    BuyHistoryComponent,
    ListBuyComponent,
    AddDataComponent,
    EditComponent,
    MounthComponent,
    BuyAllComponent,
    DashboardComponent,
    TodayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    DividerModule,
    PanelModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    CardModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
    HttpClientModule,
    CalendarModule,
    CommonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
