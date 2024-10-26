import { Injectable } from '@angular/core';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  url = 'http://localhost:3000/topics';
  
  constructor() { }

  async getAllTopics(): Promise<Topic[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getTopicById(id: number): Promise<Topic | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  saveTopic(newTopic: Topic): Topic {
    console.log(JSON.stringify(newTopic));
    fetch(this.url, { 
      method: "post",
      body: JSON.stringify(newTopic),
    });
    return newTopic;
  }

}