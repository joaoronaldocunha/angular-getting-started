import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Topic } from '../topic';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss'
})
export class TopicCardComponent {
  // exclamação é usada para informar que é esperado um valor e não tem valor padrão definido.
  @Input() topic!: Topic;
}