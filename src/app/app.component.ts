import { Component } from '@angular/core';
import { Task } from './treetable/mocks/models';
import { mockTreeAsArrayOfNodes } from './treetable/mocks/mockTreeAsArrayOfNodes';
import { Node } from './treetable/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'tree-test2';
  arrayOfNodesTree: Node<Task>[] = mockTreeAsArrayOfNodes;
}
