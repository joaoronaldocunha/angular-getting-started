import { Injectable } from '@angular/core';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topicList: Topic[] = [
    {
      id: 123,
      title: 'Desenvolvimento Angular',
      banner: 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png',
      description: 'Meu primeiro projeto em Angular',
      video: 'https://www.youtube.com/embed/mVjYG9TSN88'
    },
    {
      id: 456,
      title: 'Introdução Javascript',
      banner: 'https://techblog.synagila.com/wp-content/uploads/sites/2/2014/07/javascript-logo-banner.jpg',
      description: 'Programação Web com Javascript',
      video: 'https://www.youtube.com/embed/qKJP93dWn40'
    },
    {
      id: 789,
      title: 'Criando interfaces Web com HTML e CSS',
      banner: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220630132824/HTML-Full-Form.jpg',
      description: 'Conceitos programação HTML e CSS',
      video: 'https://www.youtube.com/embed/mzPxo7Y6JyA'
    },
  ];
  constructor() { }

  getAllTopics(): Topic[] {
    return this.topicList;
  }
  getTopicById(id: number): Topic | undefined {
    return this.topicList.find((topic) => topic.id === id);
  }
  saveTopic(newTopic: Topic): Topic {
    this.topicList.push(newTopic);
    return newTopic;
  }

}