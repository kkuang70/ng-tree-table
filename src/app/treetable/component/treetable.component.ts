import { Component, OnInit, Input } from '@angular/core';
import { Required } from '../decorators/required.decorator';
import { Node, TreeTableNode, Options, SearchableNode } from '../models';
import {MatTableDataSource} from '@angular/material/table'; 
import { defaults, flatMap } from 'lodash-es';
import { defaultOptions } from '../default.options';
import { ValidatorService } from '../services/validator/validator.service';
import { TreeService } from '../services/tree/tree.service';
import { ConverterService } from '../services/converter/converter.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss']
})
export class TreetableComponent<T> implements OnInit {
  @Input() tree: Node<T> | Node<T>[] = [];
  @Input() options: Options<T> = {};
  private treeTable: TreeTableNode<T>[] = [];
  private searchableTree: SearchableNode<T>[] | undefined;


  // dataSource2: MatTableDataSource<TreeTableNode<T>> | undefined;
  // dataSource = ELEMENT_DATA
  // displayedColumns: string[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private treeService: TreeService,
    private validatorService: ValidatorService,
    private converterService: ConverterService) { }

  ngOnInit(): void {
    this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
    this.options = this.parseOptions(defaultOptions);
    const customOrderValidator = this.validatorService.validateCustomOrder(this.tree[0] as any, this.options.customColumnOrder as any);
    if (this.options.customColumnOrder && !customOrderValidator.valid) {
      throw new Error(`
        Properties ${customOrderValidator.xor.map(x => `'${x}'`).join(', ')} incorrect or missing in customColumnOrder`
      );
    }
    this.displayedColumns = this.options.customColumnOrder
      ? this.options.customColumnOrder
      : this.extractNodeProps(this.tree[0]);
    this.searchableTree = this.tree.map(t => this.converterService.toSearchableTree(t));
    console.log(this.searchableTree)
    // const treeTableTree = this.searchableTree.map(st => this.converterService.toTreeTableTree(st));
    // this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
    // this.dataSource = this.generateDataSource();
  }

  extractNodeProps(tree: Node<T> & { value: { [k: string]: any } }): string[] {
    return Object.keys(tree.value).filter(x => typeof tree.value[x] !== 'object');
  }

  formatElevation(): string {
		return `mat-elevation-z${this.options.elevation}`; 
	}

  // Overrides default options with those specified by the user
  parseOptions(defaultOpts: Options<T>): Options<T> {
    return defaults(this.options, defaultOpts);
  }

  // onNodeClick(clickedNode: TreeTableNode<T>): void {
  //   clickedNode.isExpanded = !clickedNode.isExpanded;
  //   this.treeTable.forEach(el => {
  //     el.isVisible = this.searchableTree.every(st => {
  //       return this.treeService.searchById(st, el.id).
  //         fold([], n => n.pathToRoot)
  //         .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
  //     });
  //   });
  //   this.dataSource = this.generateDataSource();
  //   this.nodeClicked.next(clickedNode);
  // }

  generateDataSource(): MatTableDataSource<TreeTableNode<T>> {
    return new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }
}
