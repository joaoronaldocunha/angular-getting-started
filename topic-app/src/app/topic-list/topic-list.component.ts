import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicCardComponent } from '../topic-card/topic-card.component';​
import { TopicFormComponent } from '../topic-form/topic-form.component';
import { Topic } from '../topic';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [CommonModule, TopicCardComponent, TopicFormComponent],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.scss'
})
export class TopicListComponent {
  topicService: TopicService = inject(TopicService);

  topicList: Topic[] | undefined;

  constructor() {
    this.topicService.getAllTopics().then((topicList: Topic[]) => {
      this.topicList = topicList;
    });
  }
}
