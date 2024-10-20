import { Routes } from '@angular/router';
import { TopicListComponent } from './topic-list/topic-list.component'
import { TopicDetailComponent } from './topic-detail/topic-detail.component'

export const routes: Routes = [
    {
        path: '',
        component: TopicListComponent,
        title: 'Topic Details',
    },
    {
        path: 'topic-details/:id',
        component: TopicDetailComponent,
        title: 'Topic Details',
    },
];