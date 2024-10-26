import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from '../topic';
import { TopicService } from '../topic.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './topic-detail.component.html',
  styleUrl: './topic-detail.component.scss'
})
export class TopicDetailComponent {
  topicService: TopicService = inject(TopicService);
  route: ActivatedRoute = inject(ActivatedRoute);

  topic: Topic | undefined;
  topicId = -1;
    
  constructor() {
    this.topicId = Number(this.route.snapshot.params['id']);

    this.topicService.getTopicById(this.topicId).then((topic) => {
      this.topic = topic;
    });
  }
}