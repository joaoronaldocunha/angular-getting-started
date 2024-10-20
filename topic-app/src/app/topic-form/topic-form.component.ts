import { Component, inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Topic } from '../topic';
  import { TopicService } from '../topic.service';
    
  @Component({
    selector: 'app-topic-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './topic-form.component.html',
    styleUrl: './topic-form.component.scss'
  })
  export class TopicFormComponent {
    topicService: TopicService = inject(TopicService);

    topicForm = new FormGroup({
      topicId: new FormControl(0),
      topicTitle: new FormControl(''),
      topicBanner: new FormControl(''),
      topicDescription: new FormControl(''),
      topicVideo: new FormControl(''),
    });

    submitNewTopic() {
      const newTopic: Topic = {
        id: this.topicForm.value.topicId ?? 0,
        title: this.topicForm.value.topicTitle ?? '',
        banner: this.topicForm.value.topicBanner ?? '',
        description: this.topicForm.value.topicDescription ?? '',
        video: this.topicForm.value.topicVideo ?? '',
      };

      this.topicService.saveTopic(newTopic);
    }

  }