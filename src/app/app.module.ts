import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';
import { BodyComponent } from './layout/body/body.component';
import { NewTopicComponent } from './views/owner/new-topic/new-topic.component';
import { ExistingTopicComponent } from './views/owner/existing-topic/existing-topic.component';
import { SelectedTopicComponent } from './views/others/selected-topic/selected-topic.component';
import { ActiveAccountCardComponent } from './components/active-account-card/active-account-card.component';
import { TopicCardComponent } from './components/topic-card/topic-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftNavComponent,
    BodyComponent,
    NewTopicComponent,
    ExistingTopicComponent,
    SelectedTopicComponent,
    ActiveAccountCardComponent,
    TopicCardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
