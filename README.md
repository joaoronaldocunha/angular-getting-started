# angular-getting-started

## Pré Requisitos

- NodeJS: https://nodejs.org/en/download/package-manager

- VS Code: https://code.visualstudio.com/download

> Opcionalmente pode-se usar o Github Codespace que já tem o NodeJS instalado e dá acesso ao VS Code online: https://github.com/features/codespaces

## Passo 1: Criando o projeto

- Instalar ferramento do angular-cli:
```shell
npm install -g @angular/cli​
```

- Criar projeto Angular usando linha de comando:
```shell
ng new topic-app
```

- Acessar pasta do projeto:
```shell
cd topic-app
```

- Executar projeto
```shell
ng serve --open
```

> Este comando faz a construção da aplicação Angular e depois executa a aplicação localmente em um servidor Web.

## Passo 2: Customizando o Projeto

Inicialmente o Angular vem com um componente chamado app-component que é o componente da aplicação por onde se inicia a apresentação do conteúdo para o usuário. Vamos editar eles para tirar esse código inicial.

- Abrir arquivos html, scss e ts de app.component:​ `src/app/app.component`

- Modificar o template para exibir título do projeto:​

  - src/app/app-component.html
  ```html
  <h1>{{title}}</h1>
  ```

  - src/app/app-component.scss
  ```scss
  h1 {
    color: blue;
  }
  ```

## Passo 2: Incluir Bootstrap

- Na pasta do projeto (`topic-app`), instalar o bootstrap via npm:​

```shell
npm install bootstrap​
```
    
- Alterar arquivo angular.json, incluindo style e script bootstrap:​

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "src/styles.scss"
],
"scripts": [
  "./node_modules/bootstrap/dist/js/bootstrap.js"
]
```

- Testar a aplicação:
```shell
ng serve --open
```

## Passo 4: Criando Componente

Agora vamos criar um componente onde iremos exibir as informações do tópico.

- Criar o componente:
```shell
ng generate component topic-card
```

> Este comando cria 4 arquivos referentes ao novo componente: html, com o template Web do componente, SCSS, com as regras de estilo, ts, com o código TypeScript de controle, e spec.ts, com código para teste do componente.

- Customizar o componente

  - topic-card.component.ts
  ```typescript
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-topic-card',
    standalone: true,
    imports: [],
    templateUrl: './topic-card.component.html',
    styleUrl: './topic-card.component.scss'
  })
  export class TopicCardComponent {
    title = 'Desenvolvimento Angular';
    description = "Meu primeiro projeto em Angular";
  }
  ```

  > Notem que a classe define duas propriedades: title e description.

  - topic-card.component.html
  ```html
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{title}}</h5>
      <p class="card-text">{{description}}</p>
      <a href="#" class="btn btn-primary">Ver Detalhes</a>
    </div>
  </div>
  ```

  > Notem que estamos usando alguns componentes do Bootstrap.
  > Estamos acessando as propriedades title e description definidos no Typescript.

- Integrar o novo componente no aplicativo:
  - app.component.ts
  ```typescript
  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { TopicCardComponent } from './topic-card/topic-card.component';​

  @Component({
  selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TopicCardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'topic-app';
  }
  ```
  - app.component.html
  ```html
  <main>
    <header class="brand-name">
      <h1>{{title}}</h1>
    </header>
    <section class="content">
      <app-topic-card></app-topic-card>
    </section>
  </main>
  ```
  
  > Notem que para integrar o novo componente, usa-se o seletor do componente que no caso é `app-topic-card`.

## Passo 5: Definindo interface de dados

Interface de dados é a forma recomendada de definir os dados manipulados no aplicativo.

- Definir Interface
```shell
ng generate interface topic
```

- Especificar atributos da interface
```typescript
export interface Topic {
  id: number;
  banner: string;
  title: string;
  description: string;
  video: string;
}
```

- Atualizar componente topic-card

  - topic-card.component.ts
  ```typescript
  import { Component } from '@angular/core';
  import { Topic } from '../topic';

  @Component({
    selector: 'app-topic-card',
    standalone: true,
    imports: [],
    templateUrl: './topic-card.component.html',
    styleUrl: './topic-card.component.scss'
  })
  export class TopicCardComponent {
    topic: Topic  = {
      id: 123,
      title: 'Desenvolvimento Angular',
      banner: 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png',
      description: 'Meu primeiro projeto em Angular',
      video: 'https://www.youtube.com/watch?v=mVjYG9TSN88'
    };
  }
  ```

  - topic-card.component.html
  ```html
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="{{topic.banner}}" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">{{topic.title}}</h5>
        <p class="card-text">{{topic.description}}</p>
        <a href="#" class="btn btn-primary">Ver Detalhes</a>
    </div>
  </div>
  ```

  ## Passo 6: Fornecendo dados via input

  Geralmente os dados são enviados para o componente e não definidos nele. Para isso usamos input. Vamos atualizar nosso componente para isso.

  - topic-card.component.ts
  ```typescript
  import { Component, Input } from '@angular/core';
  import { Topic } from '../topic';

  @Component({
    selector: 'app-topic-card',
    standalone: true,
    imports: [],
    templateUrl: './topic-card.component.html',
    styleUrl: './topic-card.component.scss'
  })
  export class TopicCardComponent {
    // exclamação é usada para informar que é esperado um valor e não tem valor padrão definido.
    @Input() topic!: Topic;
  }
  ```

  - app.component.ts
  ```typescript
  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { TopicCardComponent } from './topic-card/topic-card.component';
  import { Topic } from './topic';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TopicCardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'Olá Mundo!';

    defaultTopic: Topic = {
      id: 123,
      title: 'Desenvolvimento Angular',
      banner: 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png',
      description: 'Meu primeiro projeto em Angular',
      video: 'https://www.youtube.com/watch?v=mVjYG9TSN88'
    };
  }
  ```

  > Note que o app.component fornece agora a entrada topic que é a propriedade defautTopic.

## Passo 7: Trabalhando com Listas

Muitas vezes lidamos com listas de dados para exibir seu conteúdo. Para trabalhar com listas, usanmos muitas a diretiva *ngfor que permite iterar sobre coleções.

- Atualizar componente para exibir lista de tópicos

  - app.component.ts
  ```typescript
  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterOutlet } from '@angular/router';
  import { TopicCardComponent } from './topic-card/topic-card.component';​
  import { Topic } from './topic';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, TopicCardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'topic-app';

    defaultTopic: Topic  = {
      id: 123,
      title: 'Desenvolvimento Angular',
      banner: 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png',
      description: 'Meu primeiro projeto em Angular',
      video: 'https://www.youtube.com/watch?v=mVjYG9TSN88'
    };

    topicList: Topic[] = [
      {
        id: 123,
        title: 'Desenvolvimento Angular',
        banner: 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png',
        description: 'Meu primeiro projeto em Angular',
        video: 'https://www.youtube.com/watch?v=mVjYG9TSN88'
      },
      {
        id: 456,
        title: 'Introdução Javascript',
        banner: 'https://techblog.synagila.com/wp-content/uploads/sites/2/2014/07/javascript-logo-banner.jpg',
        description: 'Programação Web com Javascript',
        video: 'https://www.youtube.com/watch?v=qKJP93dWn40'
      },
      {
        id: 789,
        title: 'Criando interfaces Web com HTML e CSS',
        banner: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220630132824/HTML-Full-Form.jpg',
        description: 'Conceitos programação HTML e CSS',
        video: 'https://www.youtube.com/watch?v=mzPxo7Y6JyA'
      },
    ];
  }
  ```
  
  > Note que incluímos o módulo CommonsModule para poder usar a diretifa ngFor.

  - app.component.html
  ```html
  <main>
    <header class="brand-name">
      <h1>{{title}}</h1>
    </header>
    <section class="row itemsBlock">
      <article 
        *ngFor="let topic of topicList"
        class="col-md-4 col-sm-6 col-12">
        <app-topic-card [topic]="topic"></app-topic-card>
      </article>
    </section>
  </main>
  ```

  > Ao testar o aplicativo, note que não precisamos mudar o componente topic-card porque este já recebe o input de dados que agora definimos em lista.

## Passo 8: Adicionando Services

Geralmente os dados exibidos na aplicação são obtidos por serviços e não definidos de forma estática no código do componente. O serviço é quem fará a requisição para o backend para obter os dados.

Vamos criar aqui um serviço para definir a lista de tópcios e exibir os dados do tópico.

- Criando o novo service:
```shell
ng generate service topic --skip-tests
```

  - topic.service.ts
  ```typescript
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
        video: 'https://www.youtube.com/watch?v=mVjYG9TSN88'
      },
      {
        id: 456,
        title: 'Introdução Javascript',
        banner: 'https://techblog.synagila.com/wp-content/uploads/sites/2/2014/07/javascript-logo-banner.jpg',
        description: 'Programação Web com Javascript',
        video: 'https://www.youtube.com/watch?v=qKJP93dWn40'
      },
      {
        id: 789,
        title: 'Criando interfaces Web com HTML e CSS',
        banner: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220630132824/HTML-Full-Form.jpg',
        description: 'Conceitos programação HTML e CSS',
        video: 'https://www.youtube.com/watch?v=mzPxo7Y6JyA'
      },
    ];
    
    constructor() { }

    getAllTopics(): Topic[] {
      return this.topicList;
    }
    getTopicById(id: number): Topic | undefined {
      return this.topicList.find((topic) => topic.id === id);
    }

  }
  ```

  > Note que definimos o service como injetável para podermos incluir como injeção de dependência nos componentes.

  - app.component.ts
  ```typescript
  import { Component, inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterOutlet } from '@angular/router';
  import { TopicCardComponent } from './topic-card/topic-card.component';​
  import { Topic } from './topic';
  import { TopicService } from './topic.service';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, TopicCardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    topicService: TopicService = inject(TopicService);

    title = 'topic-app';

    topicList: Topic[];

    constructor() {
      this.topicList = this.topicService.getAllTopics();
    }
  }
  ```

  > Observe que o topic.service é injetado via inject. É o framework nesse caso o responsável por criar um objeto de TopicService e injetar no app.component.

# Passo 9: Rotas

No Angular usamos as rotas para navegar entre os componentes. O app.component é o componente do aplciativo e o que se muda ali é o conteúdo via Router do angular.

Para exemplificar, vamos criar dois novos componentes: topic-lest e topic-detail.
```shell
ng generate component topic-list
ng generate component topic-detail
```

- Especificar as rotas

  - app.routes.ts
  ```typescript
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
  ```

- Alterar o component topic-list:
  - topic-list.component.ts
  ```typescript
  import { Component, inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { TopicCardComponent } from '../topic-card/topic-card.component';​
  import { Topic } from '../topic';
  import { TopicService } from '../topic.service';

  @Component({
    selector: 'app-topic-list',
    standalone: true,
    imports: [CommonModule, TopicCardComponent],
    templateUrl: './topic-list.component.html',
    styleUrl: './topic-list.component.scss'
  })
  export class TopicListComponent {
    topicService: TopicService = inject(TopicService);

    topicList: Topic[];

    constructor() {
      this.topicList = this.topicService.getAllTopics();
    }
  }
  ```

  - topic-list.component.html
  ```html
  <section class="row itemsBlock">
    <article *ngFor="let topic of topicList" class="col-md-4 col-sm-6 col-12">
      <app-topic-card [topic]="topic"></app-topic-card>
    </article>
  </section>
  ```

- Alterar o component topic-card:
  - topic-detail.component.ts
  ```typescript
  import { Component, inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { TopicCardComponent } from '../topic-card/topic-card.component';​
  import { Topic } from '../topic';
  import { TopicService } from '../topic.service';

  @Component({
    selector: 'app-topic-list',
    standalone: true,
    imports: [CommonModule, TopicCardComponent],
    templateUrl: './topic-list.component.html',
    styleUrl: './topic-list.component.scss'
  })
  export class TopicListComponent {
    topicService: TopicService = inject(TopicService);

    topicList: Topic[];

    constructor() {
      this.topicList = this.topicService.getAllTopics();
    }
  }
  ```

  - topic-detail.component.html
  ```html
  <section class="row itemsBlock">
    <article *ngFor="let topic of topicList" class="col-md-4 col-sm-6 col-12">
      <app-topic-card [topic]="topic"></app-topic-card>
    </article>
  </section>
  ```

  - topic-detail.component.scss
  ```scss
  .container img {
      max-width: 100%;
      height: auto; 
  }
  ```

- Alterar o component topic-card para incluir o router para topic-detail:
  - topic-card.component.ts
  ```typescript
  import { Component, inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { TopicCardComponent } from '../topic-card/topic-card.component';
  import { Topic } from '../topic';
  import { TopicService } from '../topic.service';

  @Component({
    selector: 'app-topic-list',
    standalone: true,
    imports: [CommonModule, TopicCardComponent],
    templateUrl: './topic-list.component.html',
    styleUrl: './topic-list.component.scss'
  })
  export class TopicListComponent {
    topicService: TopicService = inject(TopicService);

    topicList: Topic[];

    constructor() {
      this.topicList = this.topicService.getAllTopics();
    }
  }
  ```

  - topic-card.component.html
  ```html
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="{{topic.banner}}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{topic.title}}</h5>
      <p class="card-text">{{topic.description}}</p>
      <a [routerLink]="['/topic-details', topic.id]" class="btn btn-primary">Ver Detalhes</a>
    </div>
  </div>
  ```

  > O routerLink define a rota a ser acessada ao clicar no link.
  > Note que estamos passando o o topic-detail o id do tópico.

- Agora vamos alterar o topic-detail para receber o id do tópico e carregar os detalhes
  - topic-detail.component.ts
  ```typescript
  import { Component, inject } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { Topic } from '../topic';
  import { TopicService } from '../topic.service';

  @Component({
    selector: 'app-topic-detail',
    standalone: true,
    imports: [],
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
      this.topic = this.topicService.getTopicById(this.topicId);
    }
  }
  ```

  - topic-detail.component.html
  ```html
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <img src="{{topic?.banner}}">
      <h1 class="display-4">{{topic?.title}}</h1>
      <p class="lead">{{topic?.description}}</p>
    </div>
  </div> 
  ```

- Agora vamos atualizar o app.component movendo a lista para topic-list e para incluir o RouterModule e habilitar o routerLink
  - app.component.ts
  ```typescript
    import { Component } from '@angular/core';
  import { RouterOutlet, RouterModule } from '@angular/router';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'topic-app';
  }
  ```

  - app.component.html
  ```html
  <main>
    <header class="brand-name">
      <h1>
        <a [routerLink]="['/']">{{title}}</a>
      </h1>
    </header>
    <router-outlet></router-outlet>
  </main>
  ```

# Passo 10: Formulário

Formulário é fundamental apra coletar dados do usuário. Aqui vamos incluir um formulário para cadastrar tópicos.

- Alterar o Topic Service para suportar salvar novo tópico
  - topic-service.ts
  ```typescript
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
  ```

- Criar o componente de formulário
```shell
ng generate component topic-form
```

- Alterar o componente de formulário:
  - topic-form.component.ts
  ```typescript
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
  ```

  > Aqui  usamos o FormControl para definir os campos.

  - topic-form-component.html
  ```html
  <div class="modal fade" id="topic-form-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="topic-form-title">Novo tópico</h5>
          </div>
          <div class="modal-body">
              <form [formGroup]="topicForm" (submit)="submitNewTopic()">
                  <div class="form-group">
                      <label for="topic-id">Identificador do Tópico</label>
                      <input id="topic-id" formControlName="topicId" type="number" class="form-control" placeholder="Identificador do tópico">
                  </div>
                  <div class="form-group">
                      <label for="topic-title">Título do Tópico</label>
                      <input id="topic-title" formControlName="topicTitle" type="text" class="form-control" placeholder="Identificador do tópico">
                  </div>
                  <div class="form-group">
                      <label for="topic-banner">Banner do Tópico</label>
                      <input id="topic-banner" formControlName="topicBanner" type="url" class="form-control" placeholder="Banner do tópico">
                  </div>
                  <div class="form-group">
                      <label for="topic-description">Descrição</label>
                      <textarea id="topic-description" formControlName="topicDescription" class="form-control" rows="3"></textarea>
                  </div>
                  <div class="form-group">
                      <label for="topic-video">Video</label>
                      <input id="topic-video" formControlName="topicVideo" type="url" class="form-control" placeholder="Video do Tópico">
                  </div>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-primary" (click)="submitNewTopic()">Enviar</button>
          </div>
      </div>
  </div>
  ```

  > Note que o botão de submit é tratado pelo submitNewTopic() definido no componente.

- Alterar o topic-list.component para exibir modal com formulaŕio
  - topic-list.component.html
  ```typescript
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

    topicList: Topic[];

    constructor() {
      this.topicList = this.topicService.getAllTopics();
    }
  }
  ```

  - topic-form.component.html
  ```html
  <section class="row itemsBlock">

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#topic-form-modal">
          Adicionar Novo Tópico
      </button>

      <article *ngFor="let topic of topicList" class="col-md-4 col-sm-6 col-12">
            <app-topic-card [topic]="topic"></app-topic-card>
      </article>
  </section>

  <app-topic-form></app-topic-form>
  ```

  > Note que estamos usando o modal do bootstrap.

# Passo 11: Exibindo Vídeo Embedded

Agora vamos incluir o vídeo no detalhe do card. Porém para isso precisamos acreditar a URL fornecida. Vamos definir um pipe

- Criar pasta shared
```shell
mkdir shared
```

- Criar arquivo safe-pipe.ts dentro da pasta shared
  - safe-pipe.ts
  ```typescript
  import { Pipe, PipeTransform } from '@angular/core';
  import {DomSanitizer} from "@angular/platform-browser";

  @Pipe({
    name: 'safe'
  })
  export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }
    transform(url: any) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

  }
  ```

Agora vamos definir um módulo para poder usar esse pipe

- Criando módulo
```shell
ng generate module shared
```

- Atualizando módulo shared
  - shared.module.ts
  ```typescript
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { SafePipe } from './safe-pipe';

  @NgModule({
    declarations: [
      SafePipe // Declare o SafePipe aqui
    ],
    imports: [
      CommonModule
    ],
    exports: [
      SafePipe // Exporte o SafePipe para que outros módulos possam usá-lo
    ]
  })
  export class SharedModule { }
  ```

Agora podemos incluir esse módulo no projeto para usar o safe-pipe.

- Alterar o topic-detail.component para incluir o shared module
  - topic-detail.component.ts
  ```typescript
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
      this.topic = this.topicService.getTopicById(this.topicId);
    }
  }
  ```

  - topic-detail.component.html
  ```html
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <img src="{{topic?.banner}}">
      <h1 class="display-4">{{topic?.title}}</h1>
      <p class="lead">{{topic?.description}}</p>
    </div>
  </div>

  <div class="text-center mb-3">
    <iframe width="560" height="315" [src]="topic?.video | safe" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
  </div>

  ```

# Próximos passos
A construção do projeto continua.
Depois disso ainda entra a integração com o Backend, uso do localstorage, inclusao de novos componentes, entre outros.

Não perca o pique. Continue  o desenvolvimento do seu projeto.
